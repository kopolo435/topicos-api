import { TASK_REPOSITORY } from "@/constants";
import { Inject, Injectable } from "@nestjs/common";
import type { Repository } from "typeorm";
import { Task } from "./task.entity";
import type { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TaskService {
    constructor(@Inject(TASK_REPOSITORY) private repository: Repository<Task>) { }

    async getAllTasks(): Promise<Array<Task>> {
        return this.repository.find();
    }

    async getTaskById(id: string): Promise<Task | null> {
        return this.repository.findOne({ where: { id: id } });
    }

    async saveTask(title: string, description: string, dueBy: string, important: boolean) {
        const task = new Task();
        task.title = title;
        task.description = description;
        task.dueBy = new Date(dueBy);
        task.createdAt = new Date();
        task.important = important;
        task.completed = false;

        return this.repository.save(task);
    }

    async updateTask(id: string, updates: UpdateTaskDto) {
        const task = await this.repository.findOne({ where: { id: id } });
        if (task) {
            Object.assign(task, updates);
            return this.repository.save(task);
        }
    }
    

    async toggleTaskImportant(id: string) {
        const task = await this.repository.findOne({ where: { id: id } });
        if (task) {
            task.important = !task.important;
            return this.repository.save(task);
        }
    }

    async deleteTask(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}