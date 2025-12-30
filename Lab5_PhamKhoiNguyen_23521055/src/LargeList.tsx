import { ListItem } from "./ListItem";

type Item = { id: string; label: string; value: number };

type Props = {
  items: Item[];
  onDelete: (id: string) => void;
};

export function LargeList({ items, onDelete }: Props) {
  return (
    <>
      {items.map((item) => (
        <ListItem
          key={item.id}
          id={item.id}
          label={item.label}
          value={item.value}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}
