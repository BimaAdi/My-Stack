import { Command } from "commander";
import { verifyEmail } from "~/operations/auth";

const program = new Command();

program
	.command("hello")
	.argument("username")
	.description("say hello to username")
	.action(async (username) => {
		console.log("hello", username);
	});

program
	.command("ping")
	.description("ping cli")
	.action(() => {
		console.log("pong");
	});

program
	.command("verified-email")
	.argument("email")
	.description("manualy verified user")
	.action(async (email) => {
		const res = await verifyEmail({ email });
        if (res) {
            console.log(`user with email ${email} verified successfully`);
        }
        return
	});

program.parse(process.argv);
