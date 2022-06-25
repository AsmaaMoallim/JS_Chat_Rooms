import { Chatroom } from "/scripts/chat.js";
import { ChatUI } from "/scripts/ui.js";
// DOM queries
const cahtList = document.querySelector(".chat-list");

// class instances
const chatUI = new ChatUI(cahtList);
const chatroom = new Chatroom("gaming", "Nadia");
// console.log(chatroom)

// get chats and render
chatroom.getChat((data) => chatUI.render(data));
