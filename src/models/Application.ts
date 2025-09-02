import { Schema, model, Document } from "mongoose";

export interface IApplication extends Document{
    name: string;
    script: string;
    currentWorkingDirectory: string;
    execMode: string;
    instances: string;
    port: number;
    nodeEnv: string;
}

const appSchema = new Schema<IApplication>({
    name:{type:String, required: true, minlength:1, maxlength:30,unique:true},
    script:{type:String, required: true, minlength:4, maxlength:30},
    currentWorkingDirectory:{type:String, required:true, minlength:4, maxlength:150},
    execMode:{type:String, enum:["fork", "cluster"], default:"fork" },
    instances:{type:String, default:"1"},
    port:{type:Number, default:3001, minlength:1},
    nodeEnv:{type:String,  enum:["production", "development", "test"], default:"development" },
})

export const Application = model<IApplication>("Application", appSchema);