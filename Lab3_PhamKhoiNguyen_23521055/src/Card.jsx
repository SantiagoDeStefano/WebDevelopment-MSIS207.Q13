function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <hr />
      {children}
    </div>
  );
}

export default Card;
