import { useEffect } from "react";
import { useOutletContext } from "react-router";
import styles from "../styles.module.css";

function Cart() {
	const { handleCartData, deleteItem, cart } = useOutletContext();
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
	

	function handleCountChange(e, id) {
		const newCount = +e.target.value;
		const existingItem = itemsMap.get(id);
		if (newCount === 0) {
			itemsMap.delete(id);
		} else if (newCount > existingItem.count) {
			handleCartData(existingItem);
		} else if (newCount < existingItem.count) {
			deleteItem(existingItem);
		}
	}

	return (
		<div>
			<h1>Your Cart</h1>
			<p>Review the items you have added to your cart.</p>
			<div className={styles.cartDiv}>
				<ul>
					{Array.from(itemsMap.values()).map((item) => (
						<li className={styles.cartItem} key={item.id}>
							<h2>{item.title}</h2>
							<p>
								Count:
								<input
									className={styles.itemCount}
									type="number"
									value={item.count}
									onChange={(e) => handleCountChange(e, item.id)}
								/>
							</p>
							<p>Price: ${item.price}</p>
						</li>
					))}
				</ul>
				<button type="button" className={styles.checkout}>
					Checkout: ${total.toFixed(2)}
				</button>
			</div>
		</div>
	);
}

export default Cart;
