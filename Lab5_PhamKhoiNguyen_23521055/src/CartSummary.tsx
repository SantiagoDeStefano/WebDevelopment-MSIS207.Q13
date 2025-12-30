import { cartActions } from "./store/cartSlice";
import { useAppDispatch, useAppSelector } from "./store/store";
import { selectCartTax } from "./store/selectors";

export function CartSummary() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const total = useAppSelector((s) => s.cart.totalAmount);
  const tax = useAppSelector(selectCartTax);

  return (
    <div>
      <h3>Cart</h3>
      <div>Total: {total.toFixed(2)}</div>
      <div>Tax (10%): {tax.toFixed(2)}</div>

      <button
        onClick={() =>
          dispatch(
            cartActions.addItem({ id: "p1", title: "Apple", price: 2.5 })
          )
        }
      >
        Add Apple
      </button>

      <button onClick={() => dispatch(cartActions.removeItem({ id: "p1" }))}>
        Remove Apple
      </button>

      <button onClick={() => dispatch(cartActions.clearCart())}>Clear</button>

      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
