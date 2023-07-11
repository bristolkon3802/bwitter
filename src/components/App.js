import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { updateProfile } from "@firebase/auth";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false); //초기화 체크
  const [userObj, setUseObj] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth,(user) => {
      if(user) {
        setUseObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(user, {displayName: user.displayName}),
        });
        //console.log("user = ",user);
      } else {
        setUseObj(null);
        //console.log(isLoggedIn);
      }
      setInit(true);
      //console.log(init);
    });
  }, []);

  const refreshUser = async () => {
    //1번째 방법 - 유저의 data를 수정하였을 경우 실시간으로 변경
    const user = authService.currentUser;
    setUseObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => updateProfile(user, {displayName: user.displayName}),
    });
    //2번째 방법 - 유저의 data를 수정하였을 경우 실시간으로 변경
    //await updateCurrentUser(authService, authService.currentUser);
    //setUseObj(authService.currentUser);
  }
  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..."}
      {/* <footer>&copy; Bwitter {new Date().getFullYear()}</footer> */}
    </>

  );
}

export default App;