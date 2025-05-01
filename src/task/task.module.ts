import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { taskProviders } from "./task.providers";
@Module({
    imports: [],
    controllers: [TaskController],
    providers: [...taskProviders, TaskService],
})
export class TaskModule { }