import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { TaskModule } from "./task/task.module";
import { ConfigModule } from "@nestjs/config";
@Module({
    imports: [ConfigModule.forRoot(), DatabaseModule, TaskModule],
    controllers: [],
    providers: [],
})
export class AppModule { }