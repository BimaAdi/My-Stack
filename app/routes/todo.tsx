import { useForm } from "@tanstack/react-form";
import {
	ServerValidateError,
	createServerValidate,
} from "@tanstack/react-form/remix";
import { useEffect } from "react";
import { Form, redirect, useActionData, useLoaderData } from "react-router";
import { z } from "zod";
import Navbar from "~/components/shared/Navbar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { db } from "~/db";
import { auth } from "~/lib/auth.server";
import {
	createTodo,
	deleteTodo,
	getAllTodo,
	toggelTodo,
} from "~/operations/todo";
import {
	createTodoFormOpt,
	deleteTodoFormOpt,
	toggleTodoFormOpt,
} from "~/types/todo";
import type { Route } from "./+types/todo";

export async function loader({ request }: Route.LoaderArgs) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	if (!session) {
		return redirect("/signin?redirect=%2Ftodo");
	}

	const todo = await getAllTodo({ db, userId: session.user.id });
	return {
		todo,
	};
}

const serverCreateTodoValidate = createServerValidate({
	...createTodoFormOpt,
	onServerValidate: () => {},
});

const serverToggleTodoValidate = createServerValidate({
	...toggleTodoFormOpt,
	onServerValidate: () => {},
});

const serverDeleteTodoValidate = createServerValidate({
	...deleteTodoFormOpt,
	onServerValidate: () => {},
});

export async function action({ request }: Route.ActionArgs) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	if (!session) {
		return null;
	}
	const formData = await request.formData();
	let isCreateTodoSuccess = false;
	try {
		if (formData.get("intent") === "create") {
			const validatedData = await serverCreateTodoValidate(formData);
			await createTodo({
				db,
				todoName: validatedData.todo,
				isDone: false,
				userId: session.user.id,
			});
			isCreateTodoSuccess = true;
		} else if (formData.get("intent") === "toggle") {
			const validatedData = await serverToggleTodoValidate(formData);
			await toggelTodo({ db, id: validatedData.id });
		} else if (formData.get("intent") === "delete") {
			const validatedData = await serverDeleteTodoValidate(formData);
			await deleteTodo({ db, id: validatedData.id });
		}
	} catch (e) {
		if (e instanceof ServerValidateError) {
			return {};
		}
		console.error(e);
	}
	return {
		isCreateTodoSuccess,
	};
}

const createTodoSchema = z.object({
	todo: z.string().min(1, "cannot be empty"),
	intent: z.literal("create"),
});

export default function TodoPage() {
	const loaderData = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();
	const createTodoForm = useForm({
		...createTodoFormOpt,
		validators: {
			onMount: createTodoSchema,
			onChange: createTodoSchema,
		},
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: we know better
	useEffect(() => {
		if (actionData?.isCreateTodoSuccess) {
			createTodoForm.setFieldValue("todo", "");
			createTodoForm.validate("change");
		}
	}, [actionData]);

	const toggleTodoForm = useForm({
		...toggleTodoFormOpt,
	});
	const deleteTodoForm = useForm({
		...deleteTodoFormOpt,
	});
	return (
		<main>
			<Navbar isSignIn={true} />
			<div className="p-4">
				<h1 className="text-xl">Todo Page</h1>
				<Form method="post" onSubmit={() => createTodoForm.handleSubmit()}>
					<div className="max-w-[500px] flex gap-2">
						<createTodoForm.Field name="todo">
							{(field) => (
								<Input
									type="text"
									name={field.name}
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
							)}
						</createTodoForm.Field>
						<createTodoForm.Field name="intent">
							{(field) => (
								<input
									type="hidden"
									name={field.name}
									value={field.state.value}
								/>
							)}
						</createTodoForm.Field>
						<createTodoForm.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
						>
							{([canSubmit, isSubmitting]) => (
								<Button type="submit" disabled={!canSubmit || isSubmitting}>
									Add Todo
								</Button>
							)}
						</createTodoForm.Subscribe>
					</div>
				</Form>
				<ul className="flex flex-col gap-2 pt-2">
					{loaderData.todo.map((item) => (
						<li key={item.id} className="flex items-center gap-2">
							<p>
								{item.todo} - {item.isDone ? "V" : "X"}
							</p>{" "}
							<Form method="post">
								<toggleTodoForm.Field name="id">
									{(field) => (
										<input type="hidden" name={field.name} value={item.id} />
									)}
								</toggleTodoForm.Field>
								<toggleTodoForm.Field name="intent">
									{(field) => (
										<input
											type="hidden"
											name={field.name}
											value={field.state.value}
										/>
									)}
								</toggleTodoForm.Field>
								<Button className="bg-blue-500" type="submit">
									Toggle Done
								</Button>
							</Form>
							<Form method="post">
								<deleteTodoForm.Field name="id">
									{(field) => (
										<input type="hidden" name={field.name} value={item.id} />
									)}
								</deleteTodoForm.Field>
								<deleteTodoForm.Field name="intent">
									{(field) => (
										<input
											type="hidden"
											name={field.name}
											value={field.state.value}
										/>
									)}
								</deleteTodoForm.Field>
								<Button className="bg-red-500" type="submit">
									Delete
								</Button>
							</Form>
						</li>
					))}
				</ul>
			</div>
		</main>
	);
}
