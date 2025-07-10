import config from "../config/config";
import {Client , ID ,Databases , Storage , Query} from 'appwrite';

export class UserService{ // create a class of userservices 

    Client = new Client(); // object created of client 
    databases; 
    storage;

    // create consrtuctor  
    constructor(){
        this.Client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.databases = new Databases(this.Client);
        this.storage = new Storage(this.Client);
    }
    
    // we create a createPost method so that user can create a post and save the data in database and collection
    async createPost({title , slug , content , contentImage , status ,userId }){
        try {
            // give databasesId and collectionId for access and store data in perticular Attribute
            const document = this.databases.createDocument(config.appwriteDatabaseId , 
                                                           config.appwriteCollectionId ,
                                                           slug , // we take slug as a unique documentId 
                                                           {
                                                            // when user give below info then it will store in particular Attribute
                                                            title,
                                                            content,
                                                            contentImage,
                                                            status,
                                                            userId,
            })

            return document;
        } catch (error) {
            console.log("Appwrite service :: createPost :: error" ,error)
        }
    }
    
    // upadte Post ,  slug is a documentID 
    async updatePost(slug , {title ,content , contentImage , status ,userId }){
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseId , config.appwriteCollectionId , slug , {
                // we writedown all Attribute so that change in Attribute store new value and unchange Attribute store remain same 
                title,
                content,
                contentImage, 
                status,
            })
        } catch (error) {
           console.log("Appwrite service :: updatePost :: error" , error) 
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(config.appwriteDatabaseId , config.appwriteCollectionId , slug) // fro deletedocumet/Post we only need documentId(Slug)
            return true;
        } catch (error) {
            console.log("Appwrite service  :: deletePost :: error",error)
            return false
        }
    }

    async getPost(slug){
        try {
           return await this.databases.getDocument(config.appwriteDatabaseId , config.appwriteCollectionId , slug)
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error)
            return false ;
        }
    }

    async getPosts(){ //
        try {
            await this.databases.listDocuments(config.appwriteDatabaseId,config.appwriteCollectionId , 
                [
                    Query.equal('status' , 'active') // We can give more than one Query 
                ])
            return true;
        } catch (error) {
            console.log("appwrite service :: getPosts :: error",error)
            return false
        }
    }

    // create file so user can uploadfile
    async uploadFile(file){
        try {
            const fileID = await this.storage.createFile(config.appwriteBucketId ,ID.unique() , file );
            return fileID;
        } catch (error) {
            console.log("Appwrite service :: uploFile :: error" , error)
        }
    }

    // delete file
    async deleteFile(fileID){
        try {
           await this.storage.deleteFile(config.appwriteBucketId , fileID)
           return true; 
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error" , error)
            return false;
        }
    }

    getFilePreview(fileID){
        return this.storage.getFilePreview(config.appwriteBucketId,fileID)
    }
}

const userservice = new UserService(); // if we direct  export class then user have to create object to use so we create a object of class and export that object

export default userservice;
