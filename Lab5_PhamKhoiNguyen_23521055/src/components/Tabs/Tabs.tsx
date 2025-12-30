import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from "react";

type TabsContextValue = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error("Tabs components must be used inside <Tabs>.");
  }
  return ctx;
}

type TabsProps = {
  defaultIndex?: number;
  children: ReactNode;
  onChange?: (index: number) => void;
};

function TabsRoot({ defaultIndex = 0, children, onChange }: TabsProps) {
  const [activeIndex, setActiveIndexState] = useState(defaultIndex);

  const setActiveIndex = (index: number) => {
    setActiveIndexState(index);
    onChange?.(index);
  };

  const value = useMemo(
    () => ({ activeIndex, setActiveIndex }),
    [activeIndex]
  );

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

type TabsListProps = HTMLAttributes<HTMLDivElement>;

function TabsList({ children, ...rest }: TabsListProps) {
  return (
    <div role="tablist" {...rest}>
      {children}
    </div>
  );
}

type TabsTabProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  index: number;
};

function TabsTab({ index, children, ...rest }: TabsTabProps) {
  const { activeIndex, setActiveIndex } = useTabsContext();
  const isActive = activeIndex === index;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`tab-panel-${index}`}
      id={`tab-${index}`}
      tabIndex={isActive ? 0 : -1}
      onClick={(e) => {
        rest.onClick?.(e);
        setActiveIndex(index);
      }}
      {...rest}
      style={{
        padding: "8px 12px",
        borderRadius: 8,
        border: "1px solid #ccc",
        background: isActive ? "#eee" : "transparent",
        cursor: "pointer",
        ...rest.style,
      }}
    >
      {children}
    </button>
  );
}

type TabsPanelProps = HTMLAttributes<HTMLDivElement> & {
  index: number;
  keepMounted?: boolean;
};

function TabsPanel({ index, keepMounted = false, children, ...rest }: TabsPanelProps) {
  const { activeIndex } = useTabsContext();
  const isActive = activeIndex === index;

  // Optional: don't mount inactive panels (better perf)
  if (!keepMounted && !isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-${index}`}
      hidden={!isActive}
      {...rest}
      style={{
        padding: 12,
        border: "1px solid #ddd",
        borderRadius: 8,
        marginTop: 12,
        ...rest.style,
      }}
    >
      {children}
    </div>
  );
}

// Compound API: Tabs.List, Tabs.Tab, Tabs.Panel
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
});
