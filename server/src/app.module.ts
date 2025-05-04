import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TaskModule } from './task/task.module';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        ConfigModule.forRoot(), 
        DatabaseModule, 
        TaskModule
    ]
})
export class AppModule {}
