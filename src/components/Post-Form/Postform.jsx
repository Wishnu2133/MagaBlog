import {useCallback , useEffect} from 'react';
import {Button ,RTE , InputFild } from  '../index'
import userservice from '../../appwrite/conf';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function Postform(post){
    const {register , handleSubmit , watch ,setValue , control , getValues}= useForm({defaultValues:{
        title : post?.title || '',
        slug : post?.slug || '',
        content : post?.content || '',
        status : post?.status || 'active',
    }})

    const navigate = useNavigate()
    const userData = useSelector( state => state.user.userData)

    // To create new post or update post 
    const submit  = async (data) =>{
        // if Post availabel then 
        if (post) {
            // uplaoded image is store in array so access first image[0]
            // user can upload new image using uploadFile service
            const file = data.image[0] ? userservice.uploadFile(data.image[0]):null

            // if user upload new image then delete the old image
            if(file){
                userservice.deleteFile(post.contentImage)
            }

            // update the post  if user post new image then it gives new id and save in db/attribute(contentImage)
            const dbPost = await userservice.updatePost(post.$id , {
                // spread all data and overwrite contentImage 
                ...data , contentImage : file ? file.$id : undefined
            })

            // nevigate user to currently posted 
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        } 
        // else where user are come to create new post 
        else {
            // first check user select any file then user upload image using uploadfile method
            const file = data.image[0] ? await userservice.uploadFile(data.image[0]) : control.log("Please select the image")
            // file uploaded by user then 
            if(file){
                // get file if and update 
                const fileId = file.$id
                data.contentImage = fileId
                
                // create new post by using given info and Image by user 
                // give all data to createPost method and additionally giver userId so post store in login user , 
                // userid get from userData.id
                const dbPost = await userservice.createPost({...data , useId : userData.$id})

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    // creating slug ex:- Title = MegaBlog Post then slug = MegaBlog-Post
    const slugTransform = useCallback((value)=>{
        if (value && typeof value === 'String') 
            return value
            .trim()
            .toLowerCase()
            // convert space and spacial character into '-'
            .replace(/^[a-zA-z\d\s]+/g,'-') // /^[a-zA-z\d\s]/g,'-' this is called has a regex
            // ^: neglate  ,a-zA-z : check a to z and A-Z , \d: digits , \s: space , g:global ,+:additional charactor
            .replace(/\s/g,'-')
            return ''
    },[])

    // 
    useEffect(()=>{
        // we get object of value from user we only need to watch on title
        const subscription = watch((value, {name})=>{
           if (name === 'title'){
             setValue('slug' , slugTransform(value.title,{shouldValidate:true}))
           } 
        } )
        return ()=>{subscription.unsubscribe()} // we need to unsubscribe() at the end to pull out useEffect from loop for memory managment
    },[watch('title') , slugTransform , setValue])

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="w-2/3">
                <InputFild
                    label ='Title:'
                    type = 'text'
                    placeholder = 'Title'
                    className = "mb-4"
                    {...register('title' , {required : true})}
                />
                <InputFild
                    label = "slug"
                    placeholder = "Slug:"
                    className = "mb-4"
                    {...register("slug",{required:true})} // register : track the value of input of specific given name ,and validate useing require :true 
                    onInput = {(e)=>{setValue("slug", // the input of slug get by calling a function slugTransform 
                    slugTransform(e.currentTarget.value),
                    {shouldValidate : true} )}}
                />
                <RTE // mini editor
                    label="Content : " 
                    name="content"
                    control={control} defaultvalue={getValues("content")}
                />
            </div>
            <div className="w-1/3">
                <InputFild
                    label = "ContentImage"
                    type="file"
                    className="mb-4"
                    accept= "image/jpg ,image/jpeg ,image/gif ,image/png" // accept only one of given file-type 
                    {...register("image",{required:!post})} 
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={userservice.getFilePreview(post.contentImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" :undefined}
                    className="w-full"
                >
                    {post? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}
 