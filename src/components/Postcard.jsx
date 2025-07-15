import React from 'react';
import userservice from '../appwrite/conf'
import {Link} from 'react-router-dom'

function Postcard({$id , title , contentImage}) {
    return(
        <Link to={`/post/${$id}`}>
              <div className='w-full bg-gray-700  rounded-xl'>
              <div className='w-full mr-3 justify-center'>
                <img src={userservice.getFilePreview(contentImage)} alt={title} className='rounded-xl'/>
              </div>
              <h2 className='text-xl font-bold'>{title}</h2>
              </div>
        </Link>
    )
}

export default Postcard;