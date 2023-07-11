import { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { collection, onSnapshot, query } from "firebase/firestore";
import Nweet from "../components/Nweet";
import NweetFactory from "../components/NweetFactory";

const Home = ({userObj}) => 
{
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        //리얼타임 업데이트
        const q = query(
            collection(dbService, "nweets")
            );
        onSnapshot(q, (snapshot) => {
            const neweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            //console.log(neweetArray);    
            setNweets(neweetArray);
        })
    }, []);
    return (
        <div className="container">
            <NweetFactory userObj={userObj} />
            <div style={{marginTop:30}}>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
}
    
export default Home;