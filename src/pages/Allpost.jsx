import React from "react";
import userservice from "../appwrite/conf";
import { PostCard, Container } from "../components/index";

function Allpost() {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {});
  // by using getPosts method we get all post and set that post's document
  userservice.getPosts([]).then((posts) => {
    if(posts){
        setPosts(posts.documents)
    }
  });
  return (
    <div className="w-full py-4">
      <Container>
        <div className="flex flex-wrap">
            {posts.map((post)=>{
                <div key={post.$id} className="p-2 w-1/4">
                    <PostCard post={post}/>
                </div>
            })}
        </div>
      </Container>
    </div>
  );
}

export default Allpost
