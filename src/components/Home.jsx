import { useQuery } from "@tanstack/react-query";
import styles from '../styles.module.css';

function Home() {
	const { isPending, data, error, refetch } = useQuery({
		queryKey: ["dogImage"],
    gcTime:0,
		queryFn: async () => {
			const res = await fetch("https://dog.ceo/api/breed/husky/images/random");
			return res.json();
		},
	});

	if (isPending) return <div>Loading...</div>;
	if (error) return <div>Error loading image</div>;

	return (
		<div>
			<h1>Welcome to the Horry Shop!</h1>
			<p>The place to get wacky, crazy, & weird products.</p>
			<p>
				Check out our <a href="/shop">Shop</a> or <a href="/cart">Cart</a>!
			</p>
			<h2>Here is a random picture of a dog :3</h2>
			<img className={styles.randomDog}
				src={data?.message}
				alt="dog"
				onClick={refetch}
				onKeyPress={()=>{}}
			/>
		</div>
	);
}
export default Home;
