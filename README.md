# bwitter 2023

클론 트위터 React and Firebase

Firebase 
 - 데이터베이스 관련코드 없이 데이터베이스를 사용가능하게 함
 - 간단한 테스트나 아이디어를 사용한다면 꽤 유용함

1. 프로젝트 생성
npx create-react-app bwitter

2. git repository 생성 
 - https://github.com/bristolkon3802/bwitter.git

git remote add origin https://github.com/bristolkon3802/bwitter.git
git add .
git commit -m "1.0 클론 트위터 최초 커밋"
git push origin main

3. Firebase 프로젝트 생성
 - https://console.firebase.google.com/

왼쪽상단 콘솔 이동 > 프로젝트 이름 > 사용유무체크 > 계속 > ios, android, web 중 선택 > 앱등록 닉네임작성 등록
> SDK 추가
npm i firebase@9.6.1 - 클론 프로젝트에 맞춰 추가함 보통은 npm i firebase
>
프로젝트에 firebase.js 파일 생성 후 추가
import * as firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDJSd3xYcmcnGKeTq5N6KWKdZW3rzTAhZc",
    authDomain: "bwitter-333f8.firebaseapp.com",
    projectId: "bwitter-333f8",
    storageBucket: "bwitter-333f8.appspot.com",
    messagingSenderId: "32036311712",
    appId: "1:32036311712:web:ade30c21c4cae2b9636fc5"
};
  
export default firebase.initializeApp(firebaseConfig);
>
npm run start
>
index.js 파일 import 후 consol 확인
import firebase from "./firebase";
console.log(firebase);

* API - https://firebase.google.com/docs/auth/web/github-auth?hl=ko#popup-mode
* Authentication
    로그인 제공 이메일, 구글, 킷 사용 체크
    
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
    import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

* git Settings
    <> Devloper settings > OAuth Apps > New Oauth App
    Firebase 에서 나온 url or name or callback url 설정
    
    import { GithubAuthProvider } from "firebase/auth";


* Database 생성
    Firebase > 콘솔 > 빌드 > Firestore Database
    데이터베이스 만들기 > 테스트모드시작 > cloud 위치 선택

    import { addDoc, collection } from "firebase/firestore";

import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
* onSnapshot 기본적으로 데이터베이스에 무슨일이 있을때, 알림을 받음
    실시간 업데이트 설정

import { getAuth, onAuthStateChanged } from "firebase/auth";
* onAuthStateChanged 로그인 로그아웃 할 때 사용 또는 어플리케이션이 초기화 될때 발생



* storage 생성 
    이미지, 오디오, 동영상과 같은 사용자가 생성한 파일을 저장하고 가져올수 있음
    API - https://developer.mozilla.org/ko/docs/Web/API/FileReader

    FileReader

    API - https://www.npmjs.com/package/uuid
    import { v4 as uuidv4 } from 'uuid';
    npm install uuid

    이슈 Firebase > Storage > Reles 확인
        오류 : allow read, write: if false;    로 설정되 있어서 계속 업로드가 안됐습니다.
        수정 : allow read, write: if request.auth != null; or true;

    //getDownloadURL 임포트
    import { ref, uploadString, getDownloadURL } from "@firebase/storage";

    //사진 첨부 없이 텍스트만 트윗하고 싶을 때도 있으므로 기본 값을 ""로 해야한다.
    //트윗할 때 텍스트만 입력시 이미지 url ""로 비워두기 위함