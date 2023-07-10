import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { dbService } from "../fbase";
import { useState } from "react";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    //삭제
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        //console.log(ok);
        if(ok){
            const NweetTextRef = doc(dbService ,`nweets/${nweetObj.id}`);
            await deleteDoc(NweetTextRef);
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
        <div>
            {
                editing ? (
                    <>
                        {isOwner && (
                        <>
                            <form onSubmit={onSubmit}>
                                <input onChange={onChange} type="text" placeholder="Edit your nweet" value={newNweet} required />
                                <input type="submit" value="Update Nweet" />
                            </form>
                            <button onClick={toggleEditing}>취소</button>
                        </>
                        )}
                    </>
                ) : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete Nweet</button>
                                <button onClick={toggleEditing}>Edit Nweet</button>
                            </>
                        )}
                    </>
                )
            }
        </div>
    );
}

export default Nweet;