import { useEffect, useState } from "react";
import { authService, dbService } from "../fbase";
import { useHistory } from "react-router-dom";
import { collection, getDocs, query, where, orderBy } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({userObj, refreshUser}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const getMyNweets = async () => {
        const q = query(collection(dbService, "nweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt", "asc"));
        //메서드로 쿼리 결과 값 가져오기
        await getDocs(q);
        //console.log( querySnapshot.docs.map((doc) => doc.data()));
    };
    useEffect(() => {
        getMyNweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const onChange = (event) => {
        const { target:{value}, } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        //console.log(newDisplayName);
        if(userObj.displayName !== newDisplayName) {
            //user 프로필 변경
            await updateProfile(authService.currentUser, {displayName: newDisplayName})
            refreshUser();
        }
    };
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input className="formInput" onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} autoFocus />
                <input className="formBtn" type="submit" value="Update Profile" style={{marginTop:10}} />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>로그아웃</span>
        </div>
    );
};