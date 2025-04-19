import { Link } from "react-router";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Navbar({ isSignIn = false }: { isSignIn?: boolean }) {
	return (
		<nav className="w-screen flex justify-between bg-black text-white p-4">
			<div className="text-xl">
				<Link to={"/"} className="hover:cursor-pointer">
					Logo
				</Link>
			</div>
			<ul className="flex justify-end gap-4">
				{isSignIn ? (
					<Avatar className="bg-white text-black hover:cursor-pointer">
						<AvatarFallback>SU</AvatarFallback>
					</Avatar>
				) : (
					<>
						<li>
							<Link to={"/signin"} className="hover:cursor-pointer">
								Sign In
							</Link>
						</li>
						<li>
							<Link to={"/signup"} className="hover:cursor-pointer">
								Sign Up
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
