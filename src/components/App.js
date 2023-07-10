import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false); //초기화 체크
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUseObj] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth,(user) => {
      if(user) {
        setIsLoggedIn(true);
        setUseObj(user)
        //console.log("user = ",user);
      } else {
        setIsLoggedIn(false);
        //console.log(isLoggedIn);
      }
      setInit(true);
      //console.log(init);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."}
      {/* <footer>&copy; Bwitter {new Date().getFullYear()}</footer> */}
    </>

  );
}

export default App;