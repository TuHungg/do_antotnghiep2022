import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type DepartmentDocument = Department & Document;

@Schema({ timestamps: true })
export class Department {
	@Prop({ required: true })
	public name: string;

	@Prop()
	public address: string;

	@Prop()
	public email: string;

	@Prop()
	public QuantityEmployee: number;

	@Prop()
	public ListEmployee: [];
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
