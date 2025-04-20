import Navbar from "~/components/shared/Navbar";
import { auth } from "~/lib/auth.server";
import type { Route } from "./+types/home";

export function meta() {
	return [{ title: "My Stack" }];
}

export async function loader({ request }: Route.LoaderArgs) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});
	return {
		session,
	};
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { session } = loaderData;
	return (
		<main>
			<Navbar isSignIn={!!session} />
			<div className="p-4">
				<h1 className="text-xl">Body</h1>
			</div>
		</main>
	);
}
