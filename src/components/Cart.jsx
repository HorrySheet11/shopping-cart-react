import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import styles from "../styles.module.css";

function Cart() {
	const { handleCartData, deleteItem, cart, setCart } = useOutletContext();
	const [showDialog, setShowDialog] = useState(false);
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

	function checkCount(id) {
		return cart.reduce((acc, item) => (item.id === id ? acc + 1 : acc), 0);
	}

	useEffect(() => {
		function handleCheckout() {
			setShowDialog(true);
		}
		if (showDialog) {
			const timer = setTimeout(() => {
				handleCheckout();
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [showDialog]);

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
				<button
					type="button"
					className={styles.checkout}
					onClick={() => setShowDialog("loading")}
				>
					Checkout: ${total.toFixed(2)}
				</button>
			</div>
			{showDialog === "loading" ? (
				<dialog>
					<h1>Processing...</h1>
				</dialog>
			) : (
				showDialog && (
					<dialog className={styles.dialog}>
						<h1>DIALOG!</h1>
					</dialog>
				)
			)}
		</div>
	);
}

export default Cart;
