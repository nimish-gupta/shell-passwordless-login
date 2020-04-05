import sgMail from '@sendgrid/mail';

import { SENDGRID_API_KEY } from '../constants';

// Configure mail package (used for sending email)
sgMail.setApiKey(SENDGRID_API_KEY);

export async function send({ email, body }) {
	sgMail.send({
		to: email,
	});
	const msg = {
		to: email,
		from: 'gnimish03+tempexample@gmail.com',
		subject: 'Sending with Magic link token',
		text: body,
	};
	return sgMail.send(msg);
}
