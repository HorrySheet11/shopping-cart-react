import { useEffect } from "react";
import { useOutletContext } from "react-router";
import styles from "../styles.module.css";

function Cart() {
	const { handleCartData, deleteItem, cart,setCart } = useOutletContext();
	const total = cart.reduce((acc, item) => acc + item.price, 0);

	const cartSet = [...new Set(cart)];

	function handleCountChange(e, item) {
		const newCount = +e.target.value;
		const oldCount = checkCount(item.id);
		if (newCount === 0) {
			setCart(cart.filter((items) => items !== item));
		} else if (newCount > oldCount) {
			handleCartData(item);
		} else if (newCount < oldCount) {
			deleteItem(item.id);
		}
	}

	function checkCount(id){
		let count =0;
		for(let i = 0; i < cart.length; i++){
			if(cart[i].id === id){
				count++;
			}
		}
		return count;
	}

	return (
		<div>
			<h1>Your Cart</h1>
			<p>Review the items you have added to your cart.</p>
			<div className={styles.cartDiv}>
				<ul>
					{Array.from(cartSet.values()).map((item) => (
						<li className={styles.cartItem} key={item.id}>
							<h2>{item.title}</h2>
							<p>
								Count:
								<input
									className={styles.itemCount}
									type="number"
									value={checkCount(item.id)}
									onChange={(e) => handleCountChange(e, item)}
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
