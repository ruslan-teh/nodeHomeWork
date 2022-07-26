import nodemailer from 'nodemailer';
import EmailTemplate from 'email-templates';

import path from 'path';
import { emailActionEnum, emailInfo } from '../constants';
import { config } from '../config';

class EmailService {
    private readonly templateRender = new EmailTemplate({
        views: {
            root: path.join(__dirname, '../', 'email-templates'),
        },
    });

    async sendMail(userEmail: string, action: emailActionEnum, context = {}) {
        const { subject, templateName } = emailInfo[action];

        Object.assign(context, { frontendUrl: 'http://localhost:5500' });

        const html = await this.templateRender.render(templateName, context);

        const emailTransporter = nodemailer.createTransport({
            from: 'i can send mail!!!!!!!!!',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_PASSWORD,
            },
        });

        return emailTransporter.sendMail({
            to: userEmail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
