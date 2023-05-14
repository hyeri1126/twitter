import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fbase";
import Tweet from "components/Tweet";

import { getDownloadURL } from "firebase/compat/storage";
import TweetFactory from "components/TweetFactory";

const Home = ({userObj}) => {
    
    const [tweets, setTweets] = useState([]);
    
    useEffect(()=>{
        dbService.collection("tweets").onSnapshot((snapshot)=>{
            const tweetArray = snapshot.docs.map(doc=>({
                id:doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArray);
        })
    },[]);
    
    
    // console.log(tweets);
    return (
        <div>
           <TweetFactory userObj={userObj}/>
           <div>
               {tweets.map((tweet) => (
                 <Tweet 
                    id={tweet.id} 
                    tweetObj={tweet}
                    isOwner={tweet.creatorId === userObj.uid}
                 />
               ))}
           </div>
        </div>
    )
     
}

export default Home;