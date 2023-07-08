// import mongoose from "mongoose";

// const ConectionMongoDb = async () => {
// 	mongoose.set("strictQuery", false);
// 	try {
// 		await mongoose.connect("mongodb://localhost:27017", () => {
// 			console.log("Kết nối đến MongoDB thành công!");
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
// export default ConectionMongoDb;

// export class ConnectionMongoDb {
// 	private static connection: ConnectionMongoDb;

// 	private constructor() {}

// 	public static async connect(): Promise<ConnectionMongoDb> {
// 		mongoose.set("strictQuery", false);
// 		if (!ConnectionMongoDb.connection) {
// 			ConnectionMongoDb.connection = new ConnectionMongoDb();

// 			return await mongoose.connect("mongodb://localhost:27017/neox");
// 		}

// 		return ConnectionMongoDb.connect;
// 	}
// }
