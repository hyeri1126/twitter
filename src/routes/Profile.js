import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Profile = ({userObj, refreshUser}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisPlayName] = useState(userObj.displayName);
    const onLogOutClick = () =>{
        authService.signOut();
        history.push("/");
    } 
    const getMyTweets = async()=>{
        const tweets = await dbService
        .collection("tweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt")
        .get();
        console.log(tweets.docs.map((doc)=>doc.data()));
    }
    useEffect(()=>{
        getMyTweets();
    },[])
    const onChange = (event) => {
        const {
            target: {value},
        } = event
        setNewDisPlayName(value);
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName) {
           await userObj.updateProfile({
                displayName: newDisplayName,
           });
           refreshUser();
           
        }
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName}></input>
                <input type="submit" value="Update Profile"></input>
            </form>
            <button onClick={onLogOutClick}>Logout</button>
        </>
    )
}

export default Profile;