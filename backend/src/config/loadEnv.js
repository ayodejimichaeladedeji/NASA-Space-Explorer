import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

function loadEnv(){
    const NODE_ENV = process.env.NODE_ENV || 'development'
    const envFile = path.resolve(process.cwd(), `.env.${NODE_ENV}`)

    if(fs.existsSync(envFile)){
        dotenv.config({path: envFile})
        console.log(`Loaded environment variables from ${envFile}`)
    }
    else{
        dotenv.config()
        console.log(`${envFile} not loaded. Defaulted to .env instead`)
    }
}

export default loadEnv;