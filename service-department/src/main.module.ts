import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { DepartmentModule } from "./department/department.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(
			"mongodb+srv://tuhung:tuhung123@cluster0.hjeliuv.mongodb.net/thuctaptotnghiep?retryWrites=true&w=majority"
		),
		// MongooseModule.forRoot(process.env.MONGO_URI),
		DepartmentModule,
	],
})
export class AppModule {}
