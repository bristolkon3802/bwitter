import { useState } from "react";
import { dbService, storageService } from "../fbase";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({userObj}) => 
{
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        if(nweet === "") {
            return;
        }

        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== "") { //사진이 있는지 확인
            //사진 업로드
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            //사진 업로드
            await uploadString(attachmentRef, attachment, "data_url");
            //업로드 url - 이걸 알아야 다운로드 가능
            attachmentUrl = await getDownloadURL(attachmentRef);
            //console.log(attachmentUrl);
        }
        //저장 data
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }

        //db접근해서 addDoc 하기 
        await addDoc(collection(dbService, "nweets"), nweetObj);
        //console.log(docRef);
        setNweet("");
        setAttachment("");
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
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input className="factoryInput__input" value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input className="factoryInput__arrow" type="submit" value="&rarr;" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} style={{opacity:0,}} />
            {attachment && 
                (
                <div className="factoryForm__attachment">
                    <img src={attachment} alt="" style={{backgroundImage:attachment,}} />
                    <div className="factoryForm__clear" onClick={onClearSetAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                )
            }
        </form>
    );
};

export default NweetFactory;