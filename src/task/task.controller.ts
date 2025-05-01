import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import type { CreateTaskDto } from "./dto/create-task.dto";
import type { UpdateTaskDto } from "./dto/update-task.dto";

@Controller("task")
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    public getAllTasks() {
        return this.taskService.getAllTasks();
    }

    @Get(":id") 
    public async getTaskById(@Param("id") taskId: string) {
        const task = await this.taskService.getTaskById(taskId);

        if(!task) {
            throw new NotFoundException("No task with id of '" + taskId + "' was found.");
        }

        return task;
    }

    @Post()
    public createTask(@Body() task: CreateTaskDto) {
        return this.taskService.saveTask(task.title, task.description, task.dueBy, task.important);
    }

    @Put(":id") 
    public updateTask(@Param("id")  taskId: string, @Body() task: UpdateTaskDto) {
        return this.taskService.updateTask(taskId, task);
    }

    @Put("/important/:id")
    public toggleTaskImportant(@Param("id")  taskId: string) {
        return this.taskService.toggleTaskImportant(taskId);
    }

    @Delete(":id") 
    public deleteTask(@Param("id") taskId: string) {
        return this.taskService.deleteTask(taskId);
    }
}