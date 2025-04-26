import type React from "react";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const ResetPasswordInput = ({
	label,
	name,
	value,
	onChange,
	errors = [],
}: {
	label: string;
	name: string;
	value: string;
	onChange: (e: string) => void;
	errors?: string[] | undefined;
}) => {
	return (
		<>
			<Label htmlFor={name} className={errors.length > 0 ? "text-red-500" : ""}>
				{label}
			</Label>
			<Input
				id={name}
				name={name}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={errors.length > 0 ? "border border-red-500" : ""}
				type="password"
			/>
			{errors.map((item) => (
				<p key={item} className="text-red-500">
					{item}
				</p>
			))}
		</>
	);
};
