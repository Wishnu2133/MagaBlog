import config from "../config/config";
import {Client , Account , ID} from 'appwrite';

export class AuthService{
    Client = new Client();
    account;

    constructor(){
        this.Client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.account = new Account(this.Client);
    }

    // createbuser account by unique ID ,email ,password, name
    async createAccount({email,password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
                
                if (userAccount) // if useraccount was find then we directly login  
                {
                   // we call login function 
                   this.login({email , password}) 
                } else {
                    return userAccount;
                }
            
        } catch (error) {
            return error
        }
    }

    // Login
    async login({email , password}){ // user can login using email and password
        try {
            return await this.account.createEmailPasswordSession(email ,password) // ceraeEmailPasswordSession method use to create session 
        } catch (error) {
            throw error;
        }
    }

    
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error" , error);
        }
        return null;
    }

    // logout
    async logout(){
        try {
            await this.account.deleteSession('current'); // by delete session method delete user session 

            // we can use deletesessions methos also to logout from all devices
        } catch (error) {
            console.log("Appwrite service :: logout :: error" , error)
        }
    }

    

}

const authservice = new AuthService();



export default authservice;