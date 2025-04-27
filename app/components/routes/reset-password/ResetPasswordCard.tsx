import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { authClient } from "~/lib/auth-client";
import { ResetPasswordInput } from "./ResetPasswordInput";

export const ResetPasswordCard = () => {
	const [errorMessage, setErrorMessage] = useState<string | undefined>();
	const [successMessage, setSuccessMessage] = useState<string | undefined>();
	const form = useForm({
		defaultValues: {
			password: "",
			repeatPassword: "",
		},
		onSubmit: async ({ value, formApi }) => {
			const token = new URLSearchParams(window.location.search).get("token");
			if (!token) {
				setErrorMessage("Invalid token");
				return;
			}
			const { data, error } = await authClient.resetPassword({
				newPassword: value.password,
				token,
			});
			if (error || !data.status) {
				setErrorMessage("failed to reset password");
				return;
			}
			setSuccessMessage("reset password successfully");
			formApi.reset();
		},
	});
	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Reset Password</CardTitle>
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
							{successMessage ? (
								// biome-ignore lint/a11y/useKeyWithClickEvents: needs to be on click
								<div
									className="bg-green-500 p-2 text-white rounded-l"
									onClick={() => {
										setSuccessMessage(undefined);
									}}
								>
									{successMessage}
								</div>
							) : (
								<></>
							)}
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
										<ResetPasswordInput
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
									<div className="flex justify-end items-center">
										<Button disabled={!canSubmit}>Reset Password</Button>
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
