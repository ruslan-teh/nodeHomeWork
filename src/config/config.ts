import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT,

    MYSQL_DATABASE_NAME: process.env.MYSQL_DATABASE_NAME,
    USER_SALT_ROUNDS: process.env.USER_SALT_ROUNDS,

    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    SECRET_REFRESH_KEY: process.env.SECRET_ACCESS_KEY,
    // SECRET_ACTION_KEY: process.env.SECRET_ACTION_KEY || 'qwe',

    EXPIRES_IN_ACCESS: process.env.EXPIRES_IN_ACCESS,
    EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH,
    // EXPIRES_IN_ACTION: process.env.EXPIRES_IN_ACTION,
    //
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,
};
