import { SQLSERVER } from "@/constants";
import { DataSource } from "typeorm";

export const databaseProviders = [
    {
        provide: SQLSERVER,
        useFactory: async () => new DataSource({
            type: "mssql",
            host: process.env.DB_HOST || "127.0.0.1",
            port: parseInt(process.env.DB_PORT!) || 1433,
            username: process.env.DB_USER || "root",
            password: process.env.DB_PASS || "",
            database: process.env.DB_NAME || "testdb",
            entities: [
                import.meta.dirname + "/../**/*.entity.ts"
            ]
        }).initialize()
    }
];