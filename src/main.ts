import { createApp } from 'vue'
import App from './App.vue'
import './styles/global.less';
import router from './router';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCY-r_LZ9I16a09x3ISrf59rYUsTD555CY",
  authDomain: "ratemymatch-dyd.firebaseapp.com",
  projectId: "ratemymatch-dyd",
  storageBucket: "ratemymatch-dyd.firebasestorage.app",
  messagingSenderId: "756907254475",
  appId: "1:756907254475:web:abe0ab137dc23d3a5d714e",
  measurementId: "G-S3NZJYCSZ0"
};

initializeApp(firebaseConfig);

// Utils
// const analytics = getAnalytics(app);
// const auth = getAuth(app);

// export { analytics, auth };

const app = createApp(App);
app.use(router);
app.mount('#app');
