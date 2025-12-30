import { Tabs } from "./components/Tabs/Tabs";

export function Example() {
  return (
    <Tabs defaultIndex={0} onChange={(i) => console.log("active tab:", i)}>
      <Tabs.List style={{ display: "flex", gap: 8 }}>
        <Tabs.Tab index={0}>React</Tabs.Tab>
        <Tabs.Tab index={1}>Redux</Tabs.Tab>
      </Tabs.List>

      <div className="divider" style={{ height: 1, background: "#ddd", margin: "12px 0" }} />

      <Tabs.Panel index={0}>React is a library...</Tabs.Panel>
      <Tabs.Panel index={1}>Redux is a store...</Tabs.Panel>
    </Tabs>
  );
}
