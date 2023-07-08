import { Service, ServiceBroker } from "moleculer";

import { TasksManagementController } from "../src/task-management/tasksmanager.controller";

const SERVICE_NAME = "task-service";

export default class UserTaskManagementService extends Service {
	// @ts-ignore
	public constructor(public broker: ServiceBroker) {
		super(broker);

		this.parseServiceSchema({
			name: process.env.SERVICE_NAME || SERVICE_NAME,

			settings: {},

			hooks: {
				before: {
					create: "AuthorUser",
					updateStatus: "AuthorUser",
					setTask: "AuthorUser",
					getTasksListbyUserId: "AuthorUser",
				},
			},

			actions: {
				create: {
					params: {
						title: { type: "string", optional: true },
						context: { type: "string", optional: true },
						status: { type: "string", optional: true },
					},

					handler: this.createTaskforUser,
				},

				updateStatus: {
					params: {
						_id: { type: "string", optional: true },
						status: { type: "string", optional: true },
					},

					handler: this.updateStatus,
				},

				getTasksListbyUserId: {
					params: {
						id: { type: "string", optional: true },
					},

					handler: this.getTasksListbyUserId,
				},

				getTaskList: {
					params: {
						page: { type: "number", optional: false },
					},

					handler: this.getTaskList,
				},

				setTask: {
					params: {
						_id: { type: "string", optional: false },
						userId: { type: "string", optional: false },
					},

					handler: this.setTask,
				},
			},

			events: {
				"auth-service.signin": {
					params: {
						username: "string",
						password: "string",
					},
					async handler(ctx: any) {
						console.log();

						this.logger.info(
							`User --> ${ctx.params.username} <-- Sign In In System`
						);
					},
				},
			},

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

	private async createTaskforUser(ctx: any) {
		const { title, context, status } = ctx.params;

		const result = await TasksManagementController.createTaskItem(
			title,
			context,
			status
		);

		return result;
	}

	private async updateStatus(ctx: any) {
		const { _id, status } = ctx.params;

		const result = await TasksManagementController.updateStatus(
			_id,
			status
		);

		return result;
	}

	private async getTasksListbyUserId(ctx: any) {
		const { userId } = ctx.params;

		const listTask = await TasksManagementController.getTasksListbyUserId(
			userId
		);

		return listTask;
	}

	private async getTaskList(ctx: any) {
		const { page } = ctx.params;

		const result = await TasksManagementController.getAllTask(page);

		return result;
	}

	private async setTask(ctx: any) {
		const { _id, userId } = ctx.params;

		const result = await TasksManagementController.setTaskforUser(
			_id,
			userId
		);

		return result;
	}
}
