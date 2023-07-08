import { Employee } from "./employee.dto";

export class CreateDepartmentDto {
	public name?: string;

	public address?: string;

	public email?: string;

	public QuantityEmployee?: number;

	public employee?: Employee;
}
