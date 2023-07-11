import { authService } from "../fbase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import AuthForm from "../components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
    const onSocialClick = async(event) => {
        const {
            target: {name},
        } = event;
        try {
            let provider;
            if(name === "google") {
                provider = new GoogleAuthProvider();
                const result = await signInWithPopup(authService, provider);
                GoogleAuthProvider.credentialFromResult(result);
                //console.log(credential);
            } else if(name === "github") {
                provider = new GithubAuthProvider();
                const result = await signInWithPopup(authService, provider);
                GithubAuthProvider.credentialFromResult(result);
                //console.log(credential);
            }
            //console.log(provider);
        } catch(error) {
            console.log(error.message);
        }
    }
    return (
        <div className="authContainer">
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" style={{marginBottom:30}} />
            <AuthForm />
            <div className="authBtns">
                <button className="authBtn" onClick={onSocialClick} name="google">
                    Continue with Google
                    <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button className="authBtn" onClick={onSocialClick} name="github">
                    Continue with Github
                    <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>  
        </div>
    )
};
export default Auth;