import { Chatroom } from "/scripts/chat.js";
import { ChatUI } from "/scripts/ui.js";

// DOM queries
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updatemsg = document.querySelector(".update-msg");

// update name
newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(updatemsg);
  const name = e.target.name.value.trim();
  if (name != "") {
    chatroom.updateName(name);
    newNameForm.reset();

    // show and hide the update msg
    updatemsg.innerText = `Your NEW name is ${name}`;
    setTimeout(() => {
      updatemsg.innerText = "";
    }, 4000);
  }
});

// add a new chat
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.message.value.trim();
  if (msg != "") {
    chatroom
      .addChat(msg)
      .then(() => {
        newChatForm.reset();
      })
      .catch((err) => console.log(err));
  }
});

// check local storage for a name
const username = localStorage.username ? localStorage.username : "anonymous";
// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("cooking", username);
// console.log(chatroom)

// get chats and render
chatroom.getChat((data) => chatUI.render(data));
