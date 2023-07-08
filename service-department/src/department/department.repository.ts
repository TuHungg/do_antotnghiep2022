import mongoose from "mongoose";

import { CreateDepartmentDto } from "./dto/create-department.dto";
import { Employee } from "./dto/employee.dto";
import { Department } from "./schemas/department.schema";

export interface DepartmentRepository {
	CreateDepartment(req: CreateDepartmentDto): Promise<CreateDepartmentDto>;

	GetDepartment(page: number): Promise<Department[]>;

	SearchDepartment(name: string): Promise<Department[]>;

	DeleteDepartment(id: mongoose.Types.ObjectId): Promise<string>;

	UpdateDepartment(
		_id: mongoose.Types.ObjectId,
		req: CreateDepartmentDto
	): Promise<string>;

	AddEmployee(_id: mongoose.Types.ObjectId, req: Employee): Promise<string>;
}
