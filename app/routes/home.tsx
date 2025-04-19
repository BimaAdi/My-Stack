import Navbar from "~/components/shared/Navbar";

export function meta() {
	return [{ title: "My Stack" }];
}

export default function Home() {
	return (
		<main>
			<Navbar />
			<div className="p-4">
				<h1 className="text-xl">Body</h1>
			</div>
		</main>
	);
}
