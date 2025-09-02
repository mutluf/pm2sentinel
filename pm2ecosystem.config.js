module.exports = {
    apps: [
        {
            name: "pm2sentinel",
            script: "src/index.ts",
            interpreter: "node",
            interpreter_args: ["C:\\Users\\PC\\AppData\\Roaming\\npm\\node_modules\\tsx\\dist\\cli.mjs"],
            watch: false
        }
    ]
};
