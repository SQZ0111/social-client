import axios from "axios";


const getPostFromBackend = async(setCallbackFunc) => {
    try {
      const response = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/posts`);
      console.log(response.data)
      const newPosts = response.data.map((post) => {
        return {
          id: post.id,
          title: post.title,
          pictureUrl: post.imageUrl,
          place: post.location,
          instaLink: post.instagramLink,
          cost: post.price,
          heart: post.heart,
          comments: post.comments,
          createdBy: post.createdBy
        };
      });
      setCallbackFunc(newPosts);
    } catch (error) {
      console.log(error);
    }
  };

export {getPostFromBackend}