import { useState } from "react";
import { authService } from "../fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
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
    
    const toggleAccount = () => {
        setNewAccount((prev) => !prev); 
    };
    
    const onSocialClick = async(event) => {
        //console.log(event.target.name);
        const {
            target: {name},
        } = event;
        try {
            let provider;
            if(name === "google") {
                provider = new GoogleAuthProvider();
                const result = await signInWithPopup(authService, provider);
                const credential = GoogleAuthProvider.credentialFromResult(result);
                //console.log(credential);
            } else if(name === "github") {
                provider = new GithubAuthProvider();
                const result = await signInWithPopup(authService, provider);
                const credential = GithubAuthProvider.credentialFromResult(result);
                //console.log(credential);
            }
            //console.log(provider);
        } catch(error) {
            console.log(error.message);
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "로그인"} />
                {error}
            </form>
                <span onClick={toggleAccount}>{newAccount ? "Sing in" : "Create Account"} </span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>  
        </div>
    )
};
export default Auth;