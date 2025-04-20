import SignUpCard from "~/components/routes/signup/SignUpCard";
import Navbar from "~/components/shared/Navbar";

export function meta() {
	return [{ title: "My Stack" }];
}

export default function SignUpPage() {
	return (
		<main>
			<Navbar />
			<div className="w-screen min-h-[600px] grid place-items-center">
				<SignUpCard />
			</div>
		</main>
	);
}
