export interface DataPoint {
  t: number;          // timestamp (ms)
  value: number;      // numeric value
  category: string;   // e.g., "A" | "B" | "C"
}

export class DataService {
  categories = ["A", "B", "C"];

  generate(count = 30): DataPoint[] {
    const now = Date.now();
    const out: DataPoint[] = [];
    for (let i = count - 1; i >= 0; i--) {
      out.push({
        t: now - i * 1000,
        value: 20 + Math.round(Math.random() * 60),
        category: this.categories[Math.floor(Math.random() * this.categories.length)],
      });
    }
    return out;
  }

  // Push one new point and drop the oldest (like a live feed)
  nextTick(prev: DataPoint[]): DataPoint[] {
    const next: DataPoint = {
      t: (prev[prev.length - 1]?.t ?? Date.now()) + 1000,
      value: 20 + Math.round(Math.random() * 60),
      category: this.categories[Math.floor(Math.random() * this.categories.length)],
    };
    const copy = prev.slice();
    copy.push(next);
    if (copy.length > 60) copy.shift();
    return copy;
  }

  filterByCategory(data: DataPoint[], category: string | "All"): DataPoint[] {
    if (category === "All") return data;
    return data.filter((d) => d.category === category);
  }

  sliceLastN(data: DataPoint[], n: number): DataPoint[] {
    return data.slice(Math.max(0, data.length - n));
  }
}
