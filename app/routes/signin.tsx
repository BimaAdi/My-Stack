import SignInCard from "~/components/routes/signin/SignInCard";
import Navbar from "~/components/shared/Navbar";

export function meta() {
	return [{ title: "My Stack" }];
}

export default function SignInPage() {
	return (
		<main>
			<Navbar />
			<div className="w-screen min-h-[600px] grid place-items-center">
				<SignInCard />
			</div>
		</main>
	);
}
