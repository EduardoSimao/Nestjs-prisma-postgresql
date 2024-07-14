import { DataSource } from "typeorm";
import * as dotenv from 'dotenv'


dotenv.config();

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

    migrations:[`${__dirname}/migrations/**/*`]
});

export default dataSource;