import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import styles from "../styles.module.css";

function Cart() {
	const { handleCartData, deleteItem, cart, setCart } = useOutletContext();
	const [showDialog, setShowDialog] = useState(false);
	const total = cart.reduce((acc, item) => acc + item.price, 0);
	const dialogRef = useRef(null);
	const loadingRef = useRef(null);
	const nav = useNavigate();

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

	function confirmCheckout(e) {
		setShowDialog(false);
		setCart([]);
		alert(e ==='empty'? "Your cart is empty" : "Thank you for your purchase");
		dialogRef.current?.close();
		nav("/shopping");
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <doesn't need dependency for nav and cart.length>
	useEffect(() => {
		if (showDialog === "loading") {
			loadingRef.current?.showModal();
		}
		function handleCheckout() {
			loadingRef.current?.close();
			dialogRef.current?.showModal();
		}
		if (showDialog) {
			const timer = setTimeout(() => {
				handleCheckout();
			}, 3000);
			return () => {
				clearTimeout(timer);
			};
		} else if(cart.length === 0){
			confirmCheckout('empty');
		}
	},[showDialog]);

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
			<dialog className={styles.dialog} ref={loadingRef}>
				<h1>Processing...</h1>
			</dialog>
			<dialog
				className={styles.dialog}
				ref={dialogRef}
				onCancel={() => showDialog(false)}
			>
				<h1>Checkout Summary</h1>
				<ul>
					{Array.from(cartSet.values()).map((item) => (
						<li className={styles.cartItem} key={item.id}>
							<h2>
								{item.title} x {checkCount(item.id)}
							</h2>
							<p>: ${(item.price * checkCount(item.id)).toFixed(2)}</p>
						</li>
					))}
				</ul>
				<h3>total: ${total.toFixed(2)}</h3>
				<button type="submit" onClick={() => confirmCheckout()}>
					Confirm Checkout
				</button>{" "}
				<button type="button" onClick={() => dialogRef.current?.close()}>
					Cancel
				</button>
			</dialog>
		</div>
	);
}

export default Cart;
