import { account } from "./config";

class UserAuth {
  async _createAnonymousSession(name) {
    try {
      await account.createAnonymousSession();
      await account.updateName(name);
      const user = account.get();
      return user;
    } catch (e) {
      console.error(e);
    }
  }

  async isLoggedIn() {
    try {
      await account.get();
      return true;
    } catch (e) {
      return false;
    }
  }

  async getCurrentUser() {
    try {
      const currentUser = await account.get();
      return currentUser || null;
    } catch (error) {
      console.log(error);
    }
  }

  async logOut() {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.log(error);
    }
  }
}

const userAuth = new UserAuth();
export default userAuth;
