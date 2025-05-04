import { SQLSERVER, TASK_REPOSITORY } from "@/constants";
import type { DataSource } from "typeorm";
import { Task } from "./task.entity";

export const taskProviders = [
    {
        provide: TASK_REPOSITORY,
        useFactory: (source: DataSource) => source.getRepository(Task),
        inject: [SQLSERVER]
    }
];