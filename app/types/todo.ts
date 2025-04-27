import { formOptions } from "@tanstack/react-form";

export const createTodoFormOpt = formOptions({
	defaultValues: {
		todo: "",
		intent: "create",
	},
});

export const toggleTodoFormOpt = formOptions({
	defaultValues: {
		id: "",
		intent: "toggle",
	},
});

export const deleteTodoFormOpt = formOptions({
	defaultValues: {
		id: "",
		intent: "delete",
	},
});
