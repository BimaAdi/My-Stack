import { Link, useNavigate } from "react-router";
import { authClient } from "~/lib/auth-client";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Navbar({ isSignIn = false }: { isSignIn?: boolean }) {
	const navigate = useNavigate();
	const signOut = async () => {
		await authClient.signOut();
		navigate("/signin");
	};

	return (
		<nav className="w-screen flex justify-between bg-black text-white p-4">
			<div className="text-xl">
				<Link to={"/"} className="hover:cursor-pointer">
					Logo
				</Link>
			</div>
			<ul className="flex justify-end gap-4">
				{isSignIn ? (
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Avatar className="bg-white text-black hover:cursor-pointer">
								<AvatarFallback>SU</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								className="hover:cursor-pointer"
								onClick={async () => {
									await signOut();
								}}
							>
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
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
