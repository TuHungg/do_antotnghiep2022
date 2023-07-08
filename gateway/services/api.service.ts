import { Service, ServiceBroker } from "moleculer";
import * as ApiGateway from "moleculer-web";

const SERVICE_NAME = "gateway";

export default class ApiService extends Service {
	public constructor(broker: ServiceBroker) {
		super(broker);
		// @ts-ignore
		this.parseServiceSchema({
			name: process.env.SERVICE_NAME || SERVICE_NAME,
			mixins: [ApiGateway],

			settings: {
				port: process.env.PORT || 9000,
				path: "/api",

				routes: [
					{
						path: "/auth",
						whitelist: ["auth-service.*"],

						use: [],

						mergeParams: true,

						authentication: false,

						authorization: false,

						autoAliases: true,

						aliases: {
							"POST /signin": "auth-service.signin",
							"POST /signup": "auth-service.signup",
							"GET /user": "auth-service.getAllUser",
							"PUT /update-profile": "auth-service.updateProfile",
						},

						callingOptions: {},

						bodyParsers: {
							json: {
								strict: false,
								limit: "1MB",
							},
							urlencoded: {
								extended: true,
								limit: "1MB",
							},
						},

						mappingPolicy: "all", // Available values: "all", "restrict"

						logging: true,
					},

					{
						path: "/task",
						whitelist: ["task-service.*"],
						use: [],
						mergeParams: true,
						authentication: false,
						authorization: true,
						autoAliases: true,
						aliases: {
							"POST /createTask": "task-service.create",

							"POST /setTask": "task-service.setTask",

							"PUT /updateStatus": "task-service.updateStatus",

							"GET /tasklistbyUserId":
								"task-service.getTasksListbyUserId",

							"GET /getTask": "task-service.getTaskList",
						},
						callingOptions: {},
						bodyParsers: {
							json: true,
						},
						mappingPolicy: "all", // Available values: "all", "restrict"
						logging: true,
					},

					{
						path: "/department",
						whitelist: ["department-service.*"],

						use: [],
						mergeParams: true,
						authentication: false,
						authorization: true,
						autoAliases: true,
						aliases: {
							"POST /create":
								"department-service.CreateDepartment",

							"GET /": "department-service.GetDepartment",

							"PUT /update":
								"department-service.UpdateDepartment",

							"DELETE /delete":
								"department-service.DeleteDepartment",

							"POST /add-employee":
								"department-service.AddEmployee",

							"GET /search":
								"department-service.SearchDepartment",
						},

						callingOptions: {},

						bodyParsers: {
							json: true,
						},

						mappingPolicy: "all", // Available values: "all", "restrict"

						logging: true,
					},
				],
				// Do not log client side errors (does not log an error response when the error.code is 400<=X<500)
				log4XXResponses: false,
				// Logging the request parameters. Set to any log level to enable it. E.g. "info"
				logRequestParams: null,
				// Logging the response data. Set to any log level to enable it. E.g. "info"
				logResponseData: null,
				// Serve assets from "public" folder
				assets: {
					folder: "public",
					// Options to `server-static` module
					options: {},
				},
			},

			methods: {
				authorize: async (ctx, route, req, res) => {
					let auth = req.headers["authorization"];

					if (auth && auth.startsWith("Bearer")) {
						const token = auth.slice(7);

						const payload = await ctx.call(
							"auth-service.verifyToken",
							{
								token,
							}
						);

						ctx.meta.user = payload;

						return Promise.resolve(ctx);
					} else {
						return Promise.reject("No token!");
					}
				},
			},
		});
	}
}
