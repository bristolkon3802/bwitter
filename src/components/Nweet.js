import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { dbService, storageService } from "../fbase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";


const Nweet = ({nweetObj, isOwner, attachmentUrl}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    //삭제
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        //console.log(ok);
        if(ok){
            //글삭제
            const NweetTextRef = doc(dbService ,`nweets/${nweetObj.id}`);
            await deleteDoc(NweetTextRef);
        }
        if(ok && nweetObj.attachmentUrl !== "") {
            //사진삭제
            const NweetImgRef = ref(storageService, nweetObj.attachmentUrl);
            await deleteObject(NweetImgRef);
        }
    };
    
    //수정
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        //console.log(nweetObj, newNweet);
        const NweetTextRef = doc(dbService ,`nweets/${nweetObj.id}`);
        await updateDoc(NweetTextRef,{
            text:newNweet
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const { target: {value}, } = event;
        setNewNweet(value);
    };
    return (
        <div className="nweet">
            {
                editing ? (
                    <>
                        {isOwner && (
                        <>
                            <form onSubmit={onSubmit} className="container nweetEdit">
                                <input className="formInput" onChange={onChange} type="text" placeholder="Edit your nweet" value={newNweet} required autoFocus />
                                <input className="formBtn" type="submit" value="Update Nweet" />
                            </form>
                            <span className="formBtn cancelBtn" onClick={toggleEditing}>취소</span>
                        </>
                        )}
                    </>
                ) : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {nweetObj.attachmentUrl && 
                            <img src={nweetObj.attachmentUrl} alt="" />
                        }
                        {isOwner && (
                            <div className="nweet__actions">
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                <span onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                            </div>
                        )}
                    </>
                )
            }
        </div>
    );
}

export default Nweet;