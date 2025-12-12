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
		console.log(cart);
	};

	const deleteItem = (product) => {
		for (let i = 0; i < cart.length; i++) {
			if (cart[i].id === product.id) {
				cart.splice(i, 1);
				setCart([...cart]);
				return;
			}
		}
    console.log(cart);
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
