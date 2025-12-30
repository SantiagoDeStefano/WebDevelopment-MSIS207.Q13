import { useCallback, useMemo, useState } from "react";
import { LargeList } from "./LargeList";

type Item = { id: string; label: string; value: number };

export function Dashboard({ items }: { items: Item[] }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [list, setList] = useState<Item[]>(items);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  // ✅ STABLE function reference
  const handleDelete = useCallback((id: string) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // expensive work – memoized
  const sortedItems = useMemo(() => {
    return [...list].sort((a, b) => a.value - b.value);
  }, [list]);

  return (
    <div data-theme={theme}>
      <button onClick={toggleTheme}>
        Toggle Theme ({theme})
      </button>

      <LargeList
        items={sortedItems}
        onDelete={handleDelete}
      />
    </div>
  );
}
