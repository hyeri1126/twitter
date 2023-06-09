import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Tweet = ({tweetObj, isOwner}) =>{
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet]= useState(tweetObj.text);
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delete this tweet?");
        console.log(ok)
        if(ok){
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
            await storageService.refFromURL(tweetObj.attachmentUrl).delete();
        } else {

        }
    }
    const toggleEditing = () => setEditing((prev)=>!prev)
    const onSubmit = (event)=>{
        event.preventDefault();
        console.log(tweetObj, newTweet);
        dbService.doc(`tweets/${tweetObj.id}`).update({
            text : newTweet
        });
       setEditing(false);
    }
    const onChange=(event)=>{
        const {
            target:{value},
        }=event;
        setNewTweet(value);
    }
    return (
        <div>
            { editing ? 
                (
                <>
                    <form onSubmit={onSubmit}>
                        <input type="text" value={newTweet} onChange={onChange} required></input>
                        <input type="submit" value="Update Tweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
                ) : (
                    <>
                      <h4>{tweetObj.text}</h4>
                        {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} width="50px" height="50px"></img>}
                        {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Tweet</button>
                            <button onClick={toggleEditing}>Edit Tweet</button>
                        </>
                        )}
                    </>
                  
                )
            }      
        </div>
    );   
    
};

export default Tweet;