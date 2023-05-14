import AppRouter from "./Router";
import  React, { useEffect, useState } from "react";
import {authService} from "fbase";

function App() {
  const [init, setInit] = useState(false);
  // 로그인여부판단하기-> authService.currentUser는 user 혹은 null을 반환함-> useState의 파라미터로 넘기기
  const [userObj,setUserObj] = useState(null);
  useEffect(()=>{
    // 로그인여부에 어떤 변화가 있는지 듣고있음
    authService.onAuthStateChanged((user)=>{
      if(user){
        // setIsLoggedIn(true);
        setUserObj(user);
        setUserObj({
          displayName: user.displayName,
          uid:user.uid,
          updateProfile: (args) => user.updateProfile(args),
        })
      } else {
        setUserObj(null);
      }
      setInit(true)
    })
  },[])
  // user를 새로구침해주는 function
  const refreshUser = () =>{
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid:user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  }
  return (
    <>
      {init? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} />: "Initializing,,,"}
     
    </>
    
  );
}

export default App;
