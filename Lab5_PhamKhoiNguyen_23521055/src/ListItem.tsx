import React from "react";

type Props = {
  id: string;
  label: string;
  value: number;
  onDelete: (id: string) => void;
};

function ListItemBase({ id, label, value, onDelete }: Props) {
  console.log("ListItem render:", id);

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <span>{label}</span>
      <span>{value}</span>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

export const ListItem = React.memo(ListItemBase);
