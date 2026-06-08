const postBtn = document.getElementById("postBtn");
const board = document.getElementById("messageBoard");

let messages =
    JSON.parse(localStorage.getItem("messages")) || [];

renderMessages();

postBtn.addEventListener("click", () => {

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    if (!name || !message) {
        alert("Fyll i alla fält");
        return;
    }

    const newMessage = {
        name,
        message,
        date: new Date().toLocaleString()
    };

    messages.push(newMessage);

    localStorage.setItem(
        "messages",
        JSON.stringify(messages)
    );

    renderMessages();

    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
});

function renderMessages() {

    board.innerHTML = "";

    messages
        .slice()
        .reverse()
        .forEach(msg => {

            const div = document.createElement("div");

            div.classList.add("message");

            div.innerHTML = `
                <h3>${msg.name}</h3>
                <p>${msg.message}</p>
                <small>${msg.date}</small>
            `;

            board.appendChild(div);
        });
}