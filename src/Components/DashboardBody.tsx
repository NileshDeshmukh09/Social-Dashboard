import React, { useState, useEffect } from 'react'
import { Input } from 'antd';
import PostCard from './Post';
import { Post } from '../models';


enum ViewMode {
    AllPosts,
    BookmarkedPosts,
  }
  
const DashboardBody: React.FC = () => {

    const [post, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
    const [ searchText , setSearchText] = useState<string>("");
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.AllPosts);

    const  fetchPosts = async() => {
        const data = await fetch("https://jsonplaceholder.typicode.com/posts");
        const response = await data.json();
        setPosts(response);
        setFilteredPosts(response);
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    const handleViewModeChange = (mode: ViewMode) => {
        setViewMode(mode);
      
        if (mode === ViewMode.AllPosts) {
          setFilteredPosts(post);
        } else if (mode === ViewMode.BookmarkedPosts) {
          setFilteredPosts(bookmarkedPosts);
        }
      };


    return (
        <div className='dashboard-body'>

            <div className="search-heading">
                <h1>Posts</h1>
                <Input
                    placeholder="Search Post..."
                    className='search-input'
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value)
                        const filterPosts = post.filter(post => 
                             post.title.toLowerCase().includes(searchText.toLowerCase()) || post.body.toLowerCase().includes(searchText.toLowerCase())
                        )
                        setFilteredPosts( filterPosts);
                    }
                    }
                />
            </div>

            <div className="post-body">
                <div className="post-btns">
                    <button  className='btn' onClick={() => handleViewModeChange(ViewMode.AllPosts)} >
                        All posts
                    </button>
                    <button  className='btn'  onClick={() => handleViewModeChange(ViewMode.BookmarkedPosts)}>
                        Bookmarked Posts
                    </button>


                </div>

                
                <div className='cards'>
                { filteredPosts.length === 0 &&<div className='no-posts'><p>No posts found</p></div>  }
              
                     {
                        filteredPosts.map(post =>

                            
                            <PostCard key={post?.id} post={post}
                            bookmarkedPosts={bookmarkedPosts}
                            setBookmarkedPosts={setBookmarkedPosts}
                            />
                        )
                    }
                    
                </div>
            </div>

          
            

        </div>
    )
}

export default DashboardBody