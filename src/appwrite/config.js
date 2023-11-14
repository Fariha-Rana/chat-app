import { Account, Client as Appwrite, Databases } from "appwrite";
require("dotenv").config();

export const appwrite = new Appwrite();
appwrite
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export const database = new Databases(appwrite, process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID);
export const account = new Account(appwrite);

