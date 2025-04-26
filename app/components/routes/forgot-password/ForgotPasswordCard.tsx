import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { authClient } from "~/lib/auth-client";

export const ForgotPasswordCard = () => {
	const [message, setMessage] = useState<string | undefined>();
	const [errorMessage, setErrorMessage] = useState<string | undefined>();
	const form = useForm({
		defaultValues: {
			email: "",
		},
		onSubmit: async ({ value, formApi }) => {
			const { error } = await authClient.forgetPassword({
				email: value.email,
				redirectTo: "/reset-password",
			});
			if (!error) {
				setMessage("reset email link sended, please check your email");
				formApi.reset();
			} else {
				setErrorMessage("there something wrong with the server");
			}
		},
	});
	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Forgot Password</CardTitle>
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
							{message ? (
								// biome-ignore lint/a11y/useKeyWithClickEvents: needs to be on click
								<div
									className="bg-green-500 p-2 text-white rounded-l"
									onClick={() => {
										setMessage(undefined);
									}}
								>
									{message}
								</div>
							) : (
								<></>
							)}
							{errorMessage ? (
								// biome-ignore lint/a11y/useKeyWithClickEvents: needs to be on click
								<div
									className="bg-red-500 p-2 text-white rounded-l"
									onClick={() => {
										setMessage(undefined);
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
							<form.Subscribe
								selector={(state) => [state.canSubmit, state.isSubmitting]}
							>
								{([canSubmit]) => (
									<div className="flex justify-end items-center">
										<Button disabled={!canSubmit}>
											Send Email Forgot Password
										</Button>
									</div>
								)}
							</form.Subscribe>
						</div>
					</form>
				</div>
			</CardContent>
		</Card>
	);
};
