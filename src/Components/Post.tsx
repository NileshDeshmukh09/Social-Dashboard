import React, {useState } from 'react'
import { Post } from '../models';

interface PostComponentProps {
  post: Post;
  bookmarkedPosts: Post[];
  setBookmarkedPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostCard : React.FC<PostComponentProps> = ({ post, bookmarkedPosts, setBookmarkedPosts }) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  
  const handleBookmarkClick = (postID: number) => {
    setIsBookmarked(!isBookmarked);

    if (!isBookmarked) {
      setBookmarkedPosts((prevBookmarkedPosts) => [...prevBookmarkedPosts, post]);
    } else {
      setBookmarkedPosts((prevBookmarkedPosts) =>
        prevBookmarkedPosts.filter((bookmark) => bookmark.id !== postID)
      );
    }

   

    
  };
  
  return (
    <div className='post-div'>

        <div className="upper-div">
            <div className="title-subtitle">
            <h3 className='post-title'>{post?.title}</h3>
            <p  className='post-subtitle'>By: Swift</p>
            </div>
            <i className={"fa  bookmark-icon  " + (isBookmarked ? "fa-bookmark active" : "fa-bookmark-o")}  onClick={() => handleBookmarkClick(post?.id)} ></i>
        </div>

        <p className="post-desc">{post?.body}</p>
    </div>
  )
}

export default PostCard;