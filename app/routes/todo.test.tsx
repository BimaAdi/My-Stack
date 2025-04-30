// @vitest-environment happy-dom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRoutesStub } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { describe, test } from "vitest";
import type { todoType } from "~/db/schema/todo";
import TodoPage from "./todo";

describe("todo client", () => {
	test("list todo", async () => {
		const userId = uuidv4();
		const firstTodo = "first todo";
		const secondTodo = "second todo";
		const Stub = createRoutesStub([
			{
				path: "/todo",
				Component: TodoPage,
				loader() {
					return {
						todo: [
							{
								id: uuidv4(),
								todo: firstTodo,
								isDone: false,
								userId,
							},
							{
								id: uuidv4(),
								todo: secondTodo,
								isDone: true,
								userId,
							},
						] satisfies todoType[],
					};
				},
				action() {
					return {
						isCreateTodoSuccess: true,
					};
				},
			},
		]);

		render(<Stub initialEntries={["/todo"]} />);
		await waitFor(() => screen.findByText(`${firstTodo} - X`));
		await waitFor(() => screen.findByText(`${secondTodo} - V`));
	});

	test("create todo", async () => {
		const firstTodo = "first todo";
		const todo = [] as todoType[];
		const Stub = createRoutesStub([
			{
				path: "/todo",
				Component: TodoPage,
				loader() {
					return {
						todo,
					};
				},
				action() {
					todo.push({
						id: uuidv4(),
						todo: "some todo",
						isDone: false,
						userId: "",
					});
					return {
						isCreateTodoSuccess: true,
					};
				},
			},
		]);

		render(<Stub initialEntries={["/todo"]} />);

		const input = screen.getByRole("textbox");
		await userEvent.type(input, firstTodo);
		const buttons = screen.getAllByText("Add Todo");
		await buttons[0].click();
		await waitFor(() => screen.findByText(`${firstTodo} - X`));
	});
});
