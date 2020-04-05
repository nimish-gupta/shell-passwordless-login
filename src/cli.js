import promptEmail from 'email-prompt';
import ora from 'ora';
import fetch from 'node-fetch';
import chalk from 'chalk';

import { API_URL } from '../constants';

const sleep = ({ sec }) =>
	new Promise((res) => {
		setTimeout(() => {
			res();
		}, sec * 1000);
	});

const login = async ({ email }) => {
	const response = await fetch(`${API_URL}/login`, {
		method: 'POST',
		body: JSON.stringify({ email }),
		headers: { 'Content-Type': 'application/json' },
	});
	return response.json();
};

const verify = async ({ token }) => {
	const response = await fetch(`${API_URL}/login/verify/cli`, {
		method: 'POST',
		body: JSON.stringify({ token }),
		headers: { 'Content-Type': 'application/json' },
	});
	return response.json();
};

export async function cli() {
	const email = await promptEmail({ start: `Enter your email: ` });
	console.log();
	const spinner = ora().start();
	console.log(
		chalk.yellow(`Sending you an email for verification for ${email}...`)
	);

	const { token } = await login({ email });

	spinner.stop();

	let verified;
	spinner.start(chalk.yellow('Waiting for email verification...'));

	while (!verified) {
		console.log();
		await sleep({ sec: 2 });
		const { success } = await verify({ token });
		verified = success;
	}

	spinner.stop();
	console.log(`${chalk.green('You are successfully login')}`);
	console.log();
}
