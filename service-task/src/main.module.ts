import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { TasksManagerModule } from "./task-management/tasksmanager.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		// MongooseModule.forRoot(process.env.MONGO_URI),
		MongooseModule.forRoot(
			"mongodb+srv://tuhung:tuhung123@cluster0.hjeliuv.mongodb.net/thuctaptotnghiep?retryWrites=true&w=majority"
		),
		TasksManagerModule,
	],
})
export class AppModule {}
