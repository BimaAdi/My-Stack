import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("api/auth/*", "routes/api.auth.tsx"),
	route("signin", "routes/signin.tsx"),
	route("signup", "routes/signup.tsx"),
	route("forgot-password", "routes/forgot-password.tsx"),
	route("reset-password", "routes/reset-password.tsx"),
] satisfies RouteConfig;
