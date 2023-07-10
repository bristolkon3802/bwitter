import { useEffect, useState } from "react";
import { dbService, storageService } from "../fbase";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import Nweet from "../components/Nweet";
import { ref, uploadString } from "@firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const Home = ({userObj}) => 
{
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

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
            console.log(neweetArray);    
            setNweets(neweetArray);
        })
    }, []);
    
    const onSubmit = async (event) => {
        event.preventDefault();
        
        //사진 업로드
        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        console.log(response);

        try {
            //db접근해서 addDoc 하기 
            /* await addDoc(collection(dbService, "nweets"),{
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
            }); */
            //console.log(docRef);
        } catch(error) {
            console.error(error.message);
        }
        setNweet("");
    }
    const onChange = (event) => {
        const { target:{value} } = event;
        setNweet(value);
    }
    //console.log(nweets);

    //파일 - 선택이미지 미리보기
    const onFileChange = (event) => {
        const {
            target: {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) =>{
            const {currentTarget: {result} } = finishedEvent;
            setAttachment(result)
        }
        reader.readAsDataURL(theFile);
    };
    //const fileInput = useRef();
    const onClearSetAttachment = () => {
        setAttachment("");
        //fileInput.current.value = null;
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="100px" height="100px" alt={attachment} />
                        <button onClick={onClearSetAttachment}>이미지 취소</button>
                    </div>
                    )
                }
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
}
    
export default Home;