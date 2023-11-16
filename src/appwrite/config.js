import { Account, Client , Databases } from "appwrite";
require("dotenv").config();

export const appwrite = new Client();
appwrite
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export const database = new Databases(appwrite, process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID);
export const account = new Account(appwrite);

