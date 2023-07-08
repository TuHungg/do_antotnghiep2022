import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthModule } from "./auth/auth.module";

// console.log("ENVVVV", process.env.MONGO_URI);

@Module({
	imports: [
		// ConfigModule.forRoot(),
		MongooseModule.forRoot(
			"mongodb+srv://tuhung:tuhung123@cluster0.hjeliuv.mongodb.net/thuctaptotnghiep?retryWrites=true&w=majority"
		),
		AuthModule,
	],
})
export class AppModule {}
