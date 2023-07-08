import { Service, ServiceBroker } from "moleculer";

import { DepartmentController } from "./../src/department/department.controller";

const SERVICE_NAME = "department-service";

export default class UserTaskManagementService extends Service {
	public constructor(public broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: process.env.SERVICE_NAME || SERVICE_NAME,

			settings: {},

			hooks: {
				before: {
					CreateDepartment: "AuthorUser",
				},
			},

			actions: {
				CreateDepartment: {
					params: {
						name: "string",
						address: "string",
						email: "string",
						employee: { type: "object" },
					},

					handler: this.CreateDepartment,
				},
				GetDepartment: {
					params: {
						page: "number",
					},
					handler: this.GetDepartment,
				},
				SearchDepartment: {
					params: {
						name: { type: "string", optional: true },
					},

					handler: this.SearchDepartment,
				},
				DeleteDepartment: {
					params: {
						id: { type: "string", optional: true },
					},
					handler: this.DeleteDepartment,
				},
				UpdateDepartment: {
					params: {
						_id: { type: "string", optional: true },
						req: { type: "object" },
					},
					handler: this.UpdateDepartment,
				},
				AddEmployee: {
					params: {
						_id: { type: "string", optional: true },
						employee: { type: "object" },
					},

					handler: this.AddEmployee,
				},
			},

			events: {},

			methods: {
				AuthorUser: async (ctx: any) => {
					if (ctx.meta.user.role !== "admin") {
						throw new Error("Forbidden");
					}
				},
			},

			dependencies: ["gateway"],
		});
	}

	private async CreateDepartment(ctx: any) {
		const result = await DepartmentController.CreateDepartment(ctx.params);

		return result;
	}

	private async GetDepartment(ctx: any) {
		const { page } = ctx.params;

		const result = await DepartmentController.GetDepartment(page);

		return result;
	}

	private async SearchDepartment(ctx: any) {
		const { name } = ctx.params;

		const result = await DepartmentController.SearchDepartment(name);

		return result;
	}

	private async DeleteDepartment(ctx: any) {
		const { id } = ctx.params;

		const result = await DepartmentController.DeleteDepartment(id);

		return result;
	}

	private async UpdateDepartment(ctx: any) {
		const { _id, req } = ctx.params;

		const result = await DepartmentController.UpdateDepartment(_id, req);

		return result;
	}

	private async AddEmployee(ctx: any) {
		const { _id, req } = ctx.params;

		const result = await DepartmentController.AddEmployee(_id, req);

		return result;
	}
}
