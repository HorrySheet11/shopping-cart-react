import { useOutletContext } from "react-router";
import styles from "../styles.module.css";

function Cart() {
  const { cart } = useOutletContext();

  const total = cart.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
  return (
    <div>
      <h1>Your Cart</h1>
      <p>Review the items you have added to your cart.</p>
      <p>
        <a href="/shop">Continue Shopping</a>
      </p>    
      <div className="cartDiv">
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </li>
          ))}
        </ul>
        <p>Total: ${total}</p>
      </div>

    </div>
  );
}

export default Cart;