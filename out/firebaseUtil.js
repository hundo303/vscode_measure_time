"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireBaseUtil = void 0;
const vscode = require("vscode");
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
class FireBaseUtil {
    constructor(_storage) {
        this.storage = _storage;
    }
    initFirebase() {
        const firebase_config = {
            apiKey: 'AIzaSyAk8QXcTK4ZUe1CvTU9uYvceieuHEu_HSk',
            authDomain: 'vue-firebase-8d9e2.firebaseapp.com"',
            projectId: 'vue-firebase-8d9e2',
            storageBucket: 'vue-firebase-8d9e2.appspot.com',
            messagingSenderId: '411186016432',
            appId: '1:411186016432:web:1d28e2f8094c0188c0cb75'
        };
        (0, app_1.initializeApp)(firebase_config);
        this.firestore = (0, firestore_1.getFirestore)();
    }
    getUserToken(id, pass) {
        const auth = (0, auth_1.getAuth)();
        (0, auth_1.signInWithEmailAndPassword)(auth, id, pass).then((userCredential) => {
            this.storage.update('userToken', userCredential);
        }).catch(() => {
            vscode.window.showWarningMessage("サインインに失敗しました");
        });
    }
    async setCordingTime(characterId, codingTimeAdd) {
        const uid = this.storage.get('userToken').user.uid;
        const docRef = (0, firestore_1.doc)(this.firestore, "users", uid, "characters", characterId);
        let docSnap = await (0, firestore_1.getDoc)(docRef).then();
        let userCharaData = docSnap.data();
        if (userCharaData != undefined) {
            let codingTime = userCharaData["codingTime"];
            let docData = { "codingTime": codingTime + codingTimeAdd };
            await (0, firestore_1.setDoc)(docRef, docData);
            console.log("送信に成功");
        }
    }
}
exports.FireBaseUtil = FireBaseUtil;
//# sourceMappingURL=firebaseUtil.js.map