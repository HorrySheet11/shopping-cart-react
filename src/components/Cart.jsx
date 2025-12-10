import { useOutletContext } from "react-router";
import styles from "../styles.module.css";

function Cart() {
	const { cart } = useOutletContext();
	const itemsMap = cart.reduce((map, item) => {
		const existingItem = map.get(item.id);
		if (existingItem) {
			return map.set(item.id, { ...item, count: existingItem.count + 1 });
		}
		return map.set(item.id, { ...item, count: 1 });
	}, new Map());

	const total = Array.from(itemsMap.values()).reduce((acc, item) => {
		return acc + item.price * item.count;
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
					{Array.from(itemsMap.values()).map((item) => (
						<li key={item.id}>
							<h2>{item.title}</h2>
							<p>Price: ${item.price}</p>
							<p>Count: {item.count}</p>
						</li>
					))}
				</ul>
				<p>Total: ${total}</p>
			</div>
		</div>
	);
}

export default Cart;
