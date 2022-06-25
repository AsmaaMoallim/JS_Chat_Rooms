// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACjIbV7CCQoY4EISHrkzlglmQx4weREPw",
  authDomain: "jschatroomasmaa.firebaseapp.com",
  projectId: "jschatroomasmaa",
  storageBucket: "jschatroomasmaa.appspot.com",
  messagingSenderId: "238171128482",
  appId: "1:238171128482:web:d0b508f38244e8316c4dfb",
  measurementId: "G-WK68R35M80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// export const db = getFirestore(app);
const db = getFirestore(app);

export class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = collection(db, "chats");
    this.unsub;
  }

  async addChat(message) {
    // format a new chat object
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: Timestamp.fromDate(new Date()),
    };

    // save it to DB
    const response = await addDoc(this.chats, chat);
    return response;
  }

  getChat(callback) {
    let q = query(
      this.chats,
      where("room", "==", this.room),
      orderBy("created_at"),
      limit(5)
    );

    this.unsub = onSnapshot(q, this.chats, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          //   console.log("New chat: ", change.doc.data());
          // update the ui
          callback(change.doc.data());
        }
      });

      //   console.log(snapshot.docChanges());
    });
  }

  updateName(username) {
    this.username = username;
  }

  updateRoom(room) {
    this.room = room;
    console.log("room updated");
    if (this.unsub) {
      this.unsub();
    }
  }
}

// const chatroom = new Chatroom("singing", "Asmaa");

// console.log(chatroom);

// chatroom
//   .addChat("rere")
//   .then(() => console.log("chat added"))
//   .catch((err) => console.log(err));

// chatroom.getChat((data) => {
//   console.log(data);
// });

// setTimeout(() => {
//   chatroom.updateRoom("gaming");
//   chatroom.updateName("Yahya");
//   chatroom.getChat((data) => {
//     console.log(data);
//   });
//   chatroom.addChat("hg");
// }, 3000);
