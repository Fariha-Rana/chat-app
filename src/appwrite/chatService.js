import {database} from './config';
import  userAuth from './authentication';
import { ID, Permission, Role, Query} from 'appwrite';
require("dotenv").config()

class ChatService {
  setMessages(messages) {
    this._messages = messages;
  }

  getMessages() {
    return this._messages;
  }

  async loadMessages() {
    try {
        let response;
        let allDocuments = [];

        do {
            response = await database.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
                [
                    Query.limit(100), 
                ]
            );

            if (response.documents.length > 0) {
                allDocuments = allDocuments.concat(response.documents);

                const lastId = response.documents[response.documents.length - 1].$id;

                response = await database.listDocuments(
                    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
                    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
                    [
                        Query.limit(100),
                        Query.cursorAfter(lastId),
                    ]
                );
            }
        } while (response.documents.length > 0);

        if (allDocuments.length !== 0) {
            this.setMessages(allDocuments);
        } else {
            this.setMessages(['no messages available']);
        }

    } catch (error) {
        console.error(error);
    }
}

  async sendMessage(message) {
    try {
      let user = await userAuth.getCurrentUser();
      const data = {
        user: user.name,
        message,
      };
  
      const permissions = [];

      if (user) {
        permissions.push(Permission.write(Role.users()));
      }
  
      const createdDocument = await database.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
        ID.unique(),
        data,
        permissions
      );
      return createdDocument;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
} 

const chatService = new ChatService()
export default chatService;
