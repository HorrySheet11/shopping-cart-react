import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router";
import styles from "../styles.module.css";

function Shopping() {
	const { handleCartData } = useOutletContext();
	const { isPending, data, error } = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const res = await fetch("https://fakestoreapi.com/products");
			return res.json();
		},
	});


	return (
		<div>
			<h1>Shopping</h1>
			<p>Here you can browse and select products to add to your cart.</p>
			{isPending && <div>Loading products...</div>}
			{error && <div>Error loading products</div>}
			<ul className={styles.store}>
				{data?.map((product) => (
					<li className={styles.product} key={product.id}>
						<h2>{product.title}</h2>
						<img src={product.image} alt={product.title} />
						<button
							type="button"
							onClick={()=>handleCartData(product)}
						>
							Add to Cart: ${product.price}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Shopping;
