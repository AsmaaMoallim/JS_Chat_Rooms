import {
  collection,
  addDoc,
  Timestamp,
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
  
}

const chatroom = new Chatroom("gaming", "Asmaa");

console.log(chatroom);

// chatroom.addChat("hh")
