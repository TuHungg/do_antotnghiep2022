import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { DepartmentController } from "./department.controller";
import { DepartmentHandler } from "./department.handler";
import { Department, DepartmentSchema } from "./schemas/department.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Department.name, schema: DepartmentSchema },
		]),
	],
	controllers: [DepartmentController],
	providers: [DepartmentHandler],
})
export class DepartmentModule {}
