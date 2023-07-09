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
