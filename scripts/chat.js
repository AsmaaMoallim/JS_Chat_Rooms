import {
  collection,
  addDoc,
  Timestamp,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";
import { db } from "/scripts/app.js";
// adding a new chat documents
// setting up a real-time listener to get new chats
// updating the username
// updating the room

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = collection(db, "chats");
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
    const q = query(
      this.chats,
      where("room", "==", this.room),
      orderBy("created_at"),
      limit(5)
    );

    onSnapshot(q, this.chats, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          //   console.log("New chat: ", change.doc.data());
          // update the ui
          callback(change.doc.data());
        }
        // if (change.type === "modified") {
        //   console.log("Modified chat: ", change.doc.data());
        //   // update the ui
        // }
        // if (change.type === "removed") {
        //   console.log("Removed chat: ", change.doc.data());
        //   // update the ui
        // }
      });

      //   console.log(snapshot.docChanges());
    });
  }
}

const chatroom = new Chatroom("Singing", "Asmaa");

console.log(chatroom);

// chatroom
//   .addChat("rere")
//   .then(() => console.log("chat added"))
//   .catch((err) => console.log(err));

chatroom.getChat((data) => {
  console.log(data);
});
