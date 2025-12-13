import { useState } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Outlet } from "react-router";
import styles from "./styles.module.css";

const queryClient = new QueryClient();
function App() {
	const [cart, setCart] = useState([]);

	const handleCartData = (product) => {
		setCart((prevCart) => [...prevCart, product]);
	};

	const deleteItem = (product) => {

		const index = cart.indexOf(product);
		const newCart = [...cart];
		newCart.splice(index, 1);
		setCart(newCart);
	};

	return (
		<QueryClientProvider client={queryClient}>
			<header className={styles.header}>
				<nav>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/shopping">Shopping</Link>
					</li>
					<li>
						<Link to="/cart">Cart</Link>
					</li>
				</nav>
			</header>
			<main className={styles.main}>
				<Outlet context={{ handleCartData, deleteItem, cart, setCart }} />
			</main>
		</QueryClientProvider>
	);
}

export default App;
