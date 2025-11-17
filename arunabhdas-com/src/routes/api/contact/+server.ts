import { json } from '@sveltejs/kit';
import { Resend } from 'resend';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		// Check if API key is configured
		if (!process.env.RESEND_API_KEY) {
			console.error('RESEND_API_KEY is not set in environment variables');
			return json(
				{ error: 'Email service is not configured. Please set RESEND_API_KEY environment variable.' },
				{ status: 500 }
			);
		}

		const resend = new Resend(process.env.RESEND_API_KEY);
		const { name, email, message } = await request.json();

		// Validate input
		if (!name || !email || !message) {
			return json(
				{ error: 'All fields are required' },
				{ status: 400 }
			);
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json(
				{ error: 'Invalid email address' },
				{ status: 400 }
			);
		}

		// Send email via Resend
		const { data, error } = await resend.emails.send({
			from: 'Portfolio Contact <onboarding@resend.dev>', // Replace with your verified domain later
			to: ['arunabhdas@gmail.com'],
			replyTo: email,
			subject: `Portfolio Contact from ${name}`,
			html: `
				<!DOCTYPE html>
				<html>
				<head>
					<style>
						body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
						.container { max-width: 600px; margin: 0 auto; padding: 20px; }
						.header { background: linear-gradient(135deg, #6b9bd1 0%, #8fb5e0 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
						.content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; }
						.field { margin-bottom: 15px; }
						.label { font-weight: bold; color: #6b9bd1; }
						.message-box { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #6b9bd1; }
					</style>
				</head>
				<body>
					<div class="container">
						<div class="header">
							<h2>New Contact Form Submission</h2>
						</div>
						<div class="content">
							<div class="field">
								<p class="label">From:</p>
								<p>${name}</p>
							</div>
							<div class="field">
								<p class="label">Email:</p>
								<p><a href="mailto:${email}">${email}</a></p>
							</div>
							<div class="field">
								<p class="label">Message:</p>
								<div class="message-box">
									<p>${message.replace(/\n/g, '<br>')}</p>
								</div>
							</div>
						</div>
					</div>
				</body>
				</html>
			`,
			text: `
New Contact Form Submission

From: ${name}
Email: ${email}

Message:
${message}
			`
		});

		if (error) {
			console.error('Resend error:', error);
			return json(
				{ error: 'Failed to send email' },
				{ status: 500 }
			);
		}

		return json({ success: true, data });
	} catch (error) {
		console.error('Error sending email:', error);
		return json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
};

