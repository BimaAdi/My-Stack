import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function SignUpCard() {
	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<div>
					<form>
						<div className="grid w-full items-center gap-2">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="email">Email</Label>
								<Input id="email" placeholder="hello@email.com" />
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="usernam">Username</Label>
								<Input id="usernam" placeholder="your username" />
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="password">Password</Label>
								<Input id="password" type="password" />
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="repeatPassword">Repeat Password</Label>
								<Input id="repeatPassword" type="password" />
							</div>
							<div className="flex justify-end">
								<Button>Sign Up</Button>
							</div>
						</div>
					</form>
				</div>
				<hr />
				<div className="flex flex-col gap-4">
					<Button>Sign Up using Google</Button>
					<Button>Sign Up using Github</Button>
				</div>
			</CardContent>
		</Card>
	);
}
