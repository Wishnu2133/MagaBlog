import { useState, useEffect } from "react";
import userservice from "../appwrite/conf";
import { Container, Postcard } from "../components/index";


export default function Home(){

    const [posts , segtPosts] = useState([])
    useEffect(() => { 
        userservice.getPosts([]).then((post) => {
            if(post){
                segtPosts(post.document)
            }
        })
    } , [])

    if (posts.length === 0) {

        <div className="w-full py-8 mt-4 text-centrer">
            <Container>
                <div className="flex flex-wrap p-2 w-full">
                    <h1 className="text-2xl hover:bg-gray-800 ">Login for See the Posts</h1>
                </div>
            </Container>
        </div>
        
    }

    return(
        <div>
            <Container>
                <div>
                    {posts.map((post) => {
                        <div key={post.$id} className="p-2 w-1/4">
                            <Postcard post={post}/>
                        </div>
                    })}
                </div>
            </Container>
        </div>
    )
}
