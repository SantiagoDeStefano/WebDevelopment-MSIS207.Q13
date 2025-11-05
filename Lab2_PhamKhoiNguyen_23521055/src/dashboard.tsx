/** @jsx createElement */
import { createElement, useState } from "./jsx-runtime";
import { DataService, type DataPoint } from "./data-service";
import { Chart, type ChartType } from "./chart";
import "./dashboard.css";

const ds = new DataService();

export const Dashboard = () => {
  const [chartType, setChartType] = useState<ChartType>("line");
  const [category, setCategory] = useState<"All" | "A" | "B" | "C">("All");
  const [windowSize, setWindowSize] = useState<number>(30);
  const [live, setLive] = useState<boolean>(false);
  const [data, setData] = useState<DataPoint[]>(ds.generate(30));

  // start/stop realtime updates
  // (module-level interval avoids per-keystroke focus issues)
  ;(Dashboard as any)._timer ??= null;
  const toggleLive = () => {
    if (!live) {
      (Dashboard as any)._timer = setInterval(() => {
        setData((prev: DataPoint[]) => ds.nextTick(prev));
      }, 1000);
      setLive(true);
    } else {
      clearInterval((Dashboard as any)._timer);
      (Dashboard as any)._timer = null;
      setLive(false);
    }
  };

  const resetData = () => setData(ds.generate(30));

  const filtered = ds.filterByCategory(data, category);
  const sliced = ds.sliceLastN(filtered, windowSize);

  return (
    <div className="dash">
      <header className="dash-header">
        <h1>Dashboard</h1>
        <div className="controls">
          <label>
            Chart:
            <select onChange={(e: any) => setChartType(e.target.value)} value={chartType}>
              <option value="line">Line</option>
              <option value="bar">Bar</option>
              <option value="pie">Pie</option>
            </select>
          </label>

          <label>
            Category:
            <select onChange={(e: any) => setCategory(e.target.value)} value={category}>
              <option>All</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </label>

          <label>
            Window:
            <select onChange={(e: any) => setWindowSize(Number(e.target.value))} value={windowSize}>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
              <option value="60">60</option>
            </select>
          </label>

          <button onClick={toggleLive}>{live ? "Stop" : "Start"} live</button>
          <button onClick={resetData}>Reset</button>
        </div>
      </header>

      <section className="dash-main">
        <Chart type={chartType} data={sliced} width={720} height={340} />
      </section>

      <section className="dash-cards">
        <div className="stat">
          <div className="stat-label">Points</div>
          <div className="stat-value">{sliced.length}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Min</div>
          <div className="stat-value">
            {sliced.length ? Math.min(...sliced.map((d) => d.value)) : "-"}
          </div>
        </div>
        <div className="stat">
          <div className="stat-label">Max</div>
          <div className="stat-value">
            {sliced.length ? Math.max(...sliced.map((d) => d.value)) : "-"}
          </div>
        </div>
        <div className="stat">
          <div className="stat-label">Avg</div>
          <div className="stat-value">
            {sliced.length ? Math.round(sliced.reduce((a, b) => a + b.value, 0) / sliced.length) : "-"}
          </div>
        </div>
      </section>
    </div>
  );
};
