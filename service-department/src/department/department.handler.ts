import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";

import { DepartmentRepository } from "./department.repository";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { Employee } from "./dto/employee.dto";
import { Department, DepartmentSchema } from "./schemas/department.schema";

export class DepartmentHandler implements DepartmentRepository {
	public constructor(
		@InjectModel(Department.name)
		private DepartmentModel: mongoose.Model<Department>
	) {}

	public async getDepartmentModel() {
		if (!this.DepartmentModel) {
			this.DepartmentModel = mongoose.model(
				"department",
				DepartmentSchema
			);
		}

		return this.DepartmentModel;
	}

	public async CreateDepartment(
		req: CreateDepartmentDto
	): Promise<CreateDepartmentDto> {
		const model = await this.getDepartmentModel();

		const newDepartment = {
			name: req.name,
			address: req.address,
			email: req.email,
			ListEmployee: [req.employee],
		};

		const created = await model.create(newDepartment);

		await created.save();

		return created;
	}

	public async GetDepartment(page: number): Promise<Department[]> {
		const model = await this.getDepartmentModel();

		const result = model
			.find()
			.limit(5)
			.skip(page * 5);

		return result;
	}

	public async SearchDepartment(name: string): Promise<Department[]> {
		const model = await this.getDepartmentModel();

		const result = await model.find({ name }).exec();

		return result;
	}

	public async DeleteDepartment(
		id: mongoose.Types.ObjectId
	): Promise<string> {
		const model = await this.getDepartmentModel();

		await model.findByIdAndDelete({ _id: id });

		return "Delete department successfully.";
	}

	public async UpdateDepartment(
		_id: mongoose.Types.ObjectId,
		req: CreateDepartmentDto
	): Promise<string> {
		const model = await this.getDepartmentModel();

		await model.updateOne(
			{ _id },
			{
				$set: {
					name: req.name,
					address: req.address,
					email: req.email,
					QuantityEmployee: req.QuantityEmployee,
					ListEmployee: [req.employee],
				},
			}
		);

		return "Update Employee Successfully";
	}

	public async AddEmployee(
		_id: mongoose.Types.ObjectId,
		req: Employee
	): Promise<string> {
		const model = await this.getDepartmentModel();

		await model.updateOne({ _id }, { $push: { ListEmployee: req } });

		return "Add Employee Successfully";
	}
}
