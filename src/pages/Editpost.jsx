import React ,{useEffect , useState} from 'react';
import { Container , Postform } from '../components/index';
import userservice from '../appwrite/conf';
import { useNavigate, useParams } from 'react-router-dom';


export default function Editpost(){
    const {post ,setPost} =useState(null)
    const {slug} = useParams()
    const nevigate = useNavigate()

    useEffect(()=>{
// get post from database  using url called as slug  
        if (slug) {
            userservice.getPost(slug).then((post)=>{
                // if post are thire then setpost into postForm
                if (post) {
                    setPost(post)
                }
            })
        }else {
            nevigate('/');
        }
    },[slug ,nevigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <Postform post={post}/>
            </Container>
        </div>
    )  : null
}