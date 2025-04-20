import { redirect } from "react-router";
import SignInCard from "~/components/routes/signin/SignInCard";
import Navbar from "~/components/shared/Navbar";
import { auth } from "~/lib/auth.server";
import type { Route } from "./+types/signin";

export function meta() {
	return [{ title: "My Stack" }];
}

export async function loader({ request }: Route.LoaderArgs) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});
	if (session) {
		return redirect("/");
	}
	return {};
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
