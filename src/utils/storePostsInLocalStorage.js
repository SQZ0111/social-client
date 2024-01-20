const checkLocalStorageOnPostId = (posts,id,setCallBack) => {
    console.log(posts);
    if(posts == null) {
        return false;
    }
    const isInStorage = 
    posts.some(post => {
        return post.id == id
    })
    console.log(isInStorage);
    //if post already stored then the button should also already be colored
    //if posts not already stored the button should not be colored
    isInStorage == true ? setCallBack("stored") : setCallBack("unstored");
    return isInStorage;
}
const storePost = (e,id,setCallBack,post) => {
    e.preventDefault();
    
    if(!localStorage.getItem("storedPosts")) {

        localStorage.setItem("storedPosts",JSON.stringify(Array(post)));
        setCallBack("stored");
    } else {
        //check if is there, if so then delete item from localStorage
        let posts = JSON.parse(localStorage.getItem("storedPosts"));
        if(checkLocalStorageOnPostId(posts,id,setCallBack) == false) {
            posts.push(post);
            setCallBack("stored");
            localStorage.setItem("storedPosts",JSON.stringify(posts));
        } else {
            //posts uncheck
            console.log("I am running");
            let filteredPosts = posts.filter(postElement => {
                return postElement.id == post.id ? null : postElement
            });
            setCallBack("unstored");
            localStorage.setItem("storedPosts",JSON.stringify(filteredPosts))

        }
        
    }
}

export {checkLocalStorageOnPostId,storePost};