import { Controller } from "@nestjs/common";
import mongoose from "mongoose";

import { DepartmentHandler } from "./department.handler";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { Department } from "./schemas/department.schema";
import { Employee } from "./dto/employee.dto";

@Controller()
export class DepartmentController {
	public static DepartmentHandler: DepartmentHandler;

	public constructor(_departmenthandlder: DepartmentHandler) {
		DepartmentController.DepartmentHandler = _departmenthandlder;
	}

	public static CreateDepartment(
		req: CreateDepartmentDto
	): Promise<CreateDepartmentDto> {
		return DepartmentController.DepartmentHandler.CreateDepartment(req);
	}

	public static GetDepartment(page: number): Promise<Department[]> {
		return DepartmentController.DepartmentHandler.GetDepartment(page);
	}

	public static DeleteDepartment(
		id: mongoose.Types.ObjectId
	): Promise<string> {
		return DepartmentController.DepartmentHandler.DeleteDepartment(id);
	}

	public static UpdateDepartment(
		_id: mongoose.Types.ObjectId,
		req: CreateDepartmentDto
	): Promise<string> {
		return DepartmentController.DepartmentHandler.UpdateDepartment(
			_id,
			req
		);
	}

	public static AddEmployee(
		_id: mongoose.Types.ObjectId,
		req: Employee
	): Promise<string> {
		return DepartmentController.DepartmentHandler.AddEmployee(_id, req);
	}

	public static SearchDepartment(name: string): Promise<Department[]> {
		return DepartmentController.DepartmentHandler.SearchDepartment(name);
	}
}
