import React , {useCallback , useEffect} from 'react';
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

    const submit  = async (data) =>{
        if (post) {
            const file = data.image[0] ? userservice.uploadFile(data.image[0]):null
            if(file){
                userservice.deleteFile(post.contentImage)
            }

            const dbPost = await userservice.updatePost(post.$id , {
                ...data , contentImage : file ? file.$id : undefined
            })

            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await userservice.uploadFile(data.image[0]);
            if(file){
                const fileId = file.$id
                data.contentImage = fileId
                const dbPost = await userservice.createPost({...data , useId : userData.$id})

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value)=>{
        if (value && typeof value === 'String') 
            return value
            .trim()
            .toLowerCase()
            .replace(/^[a-zA-z\d\s]/g,'-') // /^[a-zA-z\d\s]/g,'-' this is called has a regex
            // ^: neglate  ,a-zA-z : check a to z and A-Z , \d: digits , \s: space , g:global

            return ''
        
    },[])

    useEffect(()=>{
        const subscription = watch((value, {name})=>{
           if (name === 'title'){
             setValue('slug' , slugTransform(value.title,{shouldValidate:true}))
           }
           
        } )


        return ()=>{subscription.unsubscribe()} // we need to unsubscribe() at the end to pull out useEffect from loop
    },[watch('title') , slugTransform , setValue])

    return (
        <form>
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
                <RTE
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
                    accept= "image/jpg ,image/jpeg ,image/gif ,image/png"
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
 