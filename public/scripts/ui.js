// render chat templates to the DOM
// clear the list of chats (when the room changes)
// import  distanceInWordsToNow from "http://cdn.date-fns.org/v1.9.0/date_fns.min.js";
// import distanceInWordsToNow from "http://date-fns/distance_in_words_to_now";

export class ChatUI {
  constructor(list) {
    this.list = list;
  }

  render(data) {
    console.log("I work (render)")
    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSuffix: "ago",
    });
    const html = `
        <li class="list-group-item">
        <span class="username">${data.username}</span>
        <span class="message">${data.message}</span>
        <div class="time">${when}</div>
    </li>
    `;

    this.list.innerHTML += html;
  }

  clear(list){
    this.list.innerHTML = "";
  }
}
