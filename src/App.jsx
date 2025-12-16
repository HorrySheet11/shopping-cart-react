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

	const decreaseItem = (product) => {
		const index = cart.indexOf(product);
		const newCart = [...cart];
		newCart.splice(index, 1);
		setCart(newCart);
	};

	const deleteItem = (item) => {
		setCart(cart.filter((cartItem) => cartItem !== item))
	}

	return (
		<QueryClientProvider client={queryClient}>
			<header className={styles.header} data-testid='header'>
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
				<Outlet context={{ handleCartData, deleteItem, cart, decreaseItem }} />
			</main>
		</QueryClientProvider>
	);
}

export default App;
