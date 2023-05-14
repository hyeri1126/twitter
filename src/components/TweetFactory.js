import React from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

const TweetFactory = ({userObj}) => {
    const [tweet, setTweet] = useState("");
    const [attachment,setAttachment] = useState("");
    const onSubmit = async(event) => {
        event.preventDefault();
        let attachmentUrl="";
        if (attachment !== "") {
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
            const response = await fileRef.putString(attachment, "data_url");
            console.log(await response.ref.getDownloadURL());
            attachmentUrl = await response.ref.getDownloadURL();
        }
       
        const tweetObj = {
            text:tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        await dbService.collection("tweets").add(tweetObj);
        setTweet("");
        setAttachment("");
    };

    const onChange= (event) => {
        const {target: {value},} = event;
        setTweet(value);
    };
    const onFileChange = (event)=>{
       const {target:{files},}=event;
       const theFile = files[0];
       const reader = new FileReader();
       reader.onloadend = (finishedEvent)=>{
        const {
            currentTarget:{result},
        } = finishedEvent;
        setAttachment(result);
       }
       reader.readAsDataURL(theFile);
    }
    const onClearAttachment = () => setAttachment(null);

    return (
        <>
          <form onSubmit={onSubmit}>
                <input 
                    value={tweet} 
                    onChange={onChange} 
                    type="text" 
                    placeholder="What's on your mind?" 
                    maxLength={120}>
                </input>
                <input type="file" onChange={onFileChange}></input>
                <input type="submit" value="Tweet"></input>
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px"></img>
                        <button onClick={onClearAttachment}>Clear Image</button>
                    </div>
                )}
            </form>
        </>
    )

}

export default TweetFactory;