// render chat templates to the DOM
// clear the list of chats (when the room changes)

export class ChatUI {
  constructor(list) {
    this.list = list;
  }

  render(data) {
    const html = `
        <li class="list-group-item">
        <span class="username">${data.username}</span>
        <span class="message">${data.mesaage}</span>
        <div class="time">${data.created_at.toDate()}</div>
    </li>
    `;

    this.list.innerHTML += html;
  }
}
