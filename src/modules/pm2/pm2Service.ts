import pm2 from "pm2";
import {AppInfo} from "./types/appInfo.interface";
import {Application} from "../../models/Application";
import {rejects} from "node:assert";

export const connectPM2Async = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        pm2.connect((err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};


export const listAppsAsync = async (): Promise<AppInfo[]> => {

    await connectPM2Async();

    return new Promise((resolve, reject) => {
        pm2.list((err, processList) => {
            pm2.disconnect();

            if (err) return reject(err);

            const apps: AppInfo[] =
                processList.map((proc) => ({
                    name: proc.name || "unknown",
                    pm_id: proc.pm_id ?? -1,
                    status: proc.pm2_env?.status || "unknown",
                    cpu: proc.monit?.cpu || 0,
                    memory: proc.monit?.memory || 0,
                }))
            resolve(apps);
        });
    });
};

export const stopAppAsync = async (appNameOrId: string | number) : Promise<void>=>{

    await connectPM2Async();

    return new Promise((resolve, reject) => {
        pm2.stop(appNameOrId,(err)=>{
            pm2.disconnect();

            if(err) return reject(err);
        });
        resolve();
    })
}

export const startAppAsync = async (appName: string) : Promise<pm2.Proc> => {
    await connectPM2Async();

    const application = await Application.findOne({ name: appName }).exec();
    if (!application) throw new Error(`Application '${appName}' not found`);
    return new Promise((resolve, reject) => {
        pm2.start(
            {
                script: application.script,
                name: application.name,
                cwd: application.currentWorkingDirectory,
                exec_mode: application.execMode,
                instances: Number(application.instances),
                env: { NODE_ENV: application.nodeEnv, PORT: application.port.toString()}
            },
            (err, proc) => {
                if (err) {
                    console.error("PM2 start error:", err);
                    return reject(err);
                }
                console.log("PM2 started successfully:", proc);
                resolve(proc);
            }
        );
    })
}
