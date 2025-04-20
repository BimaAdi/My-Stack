import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { authClient } from "~/lib/auth-client";

export default function SignInCard() {
	const [errorMessage, setErrorMessage] = useState<string | undefined>();
	const navigate = useNavigate();
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			await authClient.signIn.email(
				{
					email: value.email,
					password: value.password,
				},
				{
					onSuccess: () => {
						navigate("/");
					},
					onError: (ctx) => {
						setErrorMessage(ctx.error.message);
					},
				},
			);
		},
	});
	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Sign In</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<div>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						<div className="grid w-full items-center gap-2">
							{errorMessage ? (
								// biome-ignore lint/a11y/useKeyWithClickEvents: needs to be on click
								<div
									className="bg-red-500 p-2 text-white rounded-l"
									onClick={() => {
										setErrorMessage(undefined);
									}}
								>
									{errorMessage}
								</div>
							) : (
								<></>
							)}
							<form.Field name="email">
								{(field) => (
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor={field.name}>Email</Label>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder="hello@email.com"
										/>
									</div>
								)}
							</form.Field>
							<form.Field name="password">
								{(field) => (
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor={field.name}>Password</Label>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											type="password"
										/>
									</div>
								)}
							</form.Field>
							<form.Subscribe
								selector={(state) => [state.canSubmit, state.isSubmitting]}
							>
								{([canSubmit]) => (
									<div className="flex justify-end">
										<Button disabled={!canSubmit}>Sign In</Button>
									</div>
								)}
							</form.Subscribe>
						</div>
					</form>
				</div>
				<hr />
				<div className="flex flex-col gap-4">
					<Button>Sign In using Google</Button>
					<Button>Sign In using Github</Button>
				</div>
			</CardContent>
		</Card>
	);
}
