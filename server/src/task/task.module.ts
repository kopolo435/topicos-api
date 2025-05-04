import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { taskProviders } from "./task.providers";

@Module({
  controllers: [TaskController],
  providers: [...taskProviders, TaskService],
})
export class TaskModule {}
