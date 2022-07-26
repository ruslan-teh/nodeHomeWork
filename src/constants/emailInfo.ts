import { emailActionEnum } from './enum';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'i can send email',
        templateName: 'welcome',
    },

    [emailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'i can send email account_blocked',
        templateName: 'account_blocked',
    },
};
