import mongoose, { Schema, Document } from "mongoose";
import { IResouce } from "./resource.interface";

export interface IResourceModel extends IResouce, Document {}

const ResourceSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IResourceModel>("resource", ResourceSchema);
