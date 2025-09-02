import {Application, IApplication} from "../../models/Application";

export const listApplicationsAsync = async (): Promise<IApplication[]> => {
    const datas = await Application.find().exec();
    return datas;
};

export const createApplicationAsync = async (application: IApplication): Promise<IApplication> => {
    const data = await Application.create(application);
    return data;
}