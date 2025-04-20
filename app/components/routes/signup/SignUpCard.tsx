import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { authClient } from "~/lib/auth-client";
import { SignUpPasswordInput } from "./SignUpPasswordInput";

export default function SignUpCard() {
	const [showModalSuccess, setShowModalSucess] = useState(false);
	const form = useForm({
		defaultValues: {
			email: "",
			name: "",
			password: "",
			repeatPassword: "",
		},
		onSubmit: async ({ value, formApi }) => {
			await authClient.signUp.email(
				{
					email: value.email, // user email address
					password: value.password, // user password -> min 8 characters by default
					name: value.name, // user display name
				},
				{
					onRequest: (ctx) => {
						//show loading
					},
					onSuccess: (ctx) => {
						formApi.reset();
						setShowModalSucess(true);
					},
					onError: (ctx) => {
						// display the error message
						alert(ctx.error.message);
					},
				},
			);
		},
	});
	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
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
							{showModalSuccess ? (
								// biome-ignore lint/a11y/useKeyWithClickEvents: needs to be on click
								<div
									className="bg-green-500 p-2 text-white rounded-l"
									onClick={() => {
										setShowModalSucess(false);
									}}
								>
									User signup successfully, please check your email to verify
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
							<form.Field name="name">
								{(field) => (
									<div className="flex flex-col space-y-1.5">
										<Label htmlFor={field.name}>Username</Label>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder="Your username"
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
							<form.Field
								name="repeatPassword"
								validators={{
									onChangeListenTo: ["password"],
									onChange: ({ value, fieldApi }) => {
										if (value !== fieldApi.form.getFieldValue("password")) {
											return "Passwords do not match";
										}
										return undefined;
									},
								}}
							>
								{(field) => (
									<div className="flex flex-col space-y-1.5">
										<SignUpPasswordInput
											name={field.name}
											label="Repeat Password"
											value={field.state.value}
											onChange={(e) => field.handleChange(e)}
											errors={
												field.state.meta.errors.map((item) => item) as string[]
											}
										/>
									</div>
								)}
							</form.Field>
							<form.Subscribe
								selector={(state) => [state.canSubmit, state.isSubmitting]}
							>
								{([canSubmit]) => (
									<div className="flex justify-end">
										<Button disabled={!canSubmit}>Sign Up</Button>
									</div>
								)}
							</form.Subscribe>
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
