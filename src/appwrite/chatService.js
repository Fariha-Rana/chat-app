import { database as appwrite} from './config';
import  userAuth from './authentication';
import { ID, Permission, Role} from 'appwrite';
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
      const response = await appwrite.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
        [],
        100,
        0,
        undefined,
        undefined,
        [],
        ['ASC']
      );
       if(response.documents.length != 0) this.setMessages(response.documents);
       else this.setMessages(['no messages available'])
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
        date: new Date().toLocaleString()
      };
  
      const permissions = [];

      if (user) {
        permissions.push(Permission.write(Role.users()));
      }
  
      const createdDocument = await appwrite.createDocument(
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
