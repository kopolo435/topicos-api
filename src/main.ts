import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

(async () => {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    app.setGlobalPrefix("api");

    const host = process.env.HOST ?? "127.0.0.1";
    const port = process.env.PORT ?? 3000;
    
    await app.listen(port, () => console.log("Server is listening at http://%s:%d/", host, port));
})();