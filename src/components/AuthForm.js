import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { authService } from "../fbase";

const AuthForm = () => 
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const toggleAccount = () => {
        setNewAccount((prev) => !prev); 
    };

    const onChange = (event) => {
        const {target: {name, value} } = event;
        if(name === "email") {
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async(event) => {
        console.log(event);
        //preventDefault - 기본행위가 실행되지 않음(리다이렉트 하지 않음)
        //사용자 계정을 성공적으로 만들면, 이 사용자는 어플리케이션에 바로 로그인도 될 것이다.
        event.preventDefault();
        try {
            let data;
            //const auth = getAuth();
            if(newAccount) {
                //Create Account
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                //로그인
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch(error) {
            setError(error.message);
        }
    };
    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input className="authInput" name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
                <input className="authInput" name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input className="authInput authSubmit" type="submit" value={newAccount ? "계정 만들기" : "로그인"} />
                {error && <span className="authError">{error}</span> }
            </form>
            <span className="authSwitch" onClick={toggleAccount}>{newAccount ? "로그인" : "계정 만들기"}</span>
        </>
    );
};

export default AuthForm;