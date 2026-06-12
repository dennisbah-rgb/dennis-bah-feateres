import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC9FVKEIc0TjrU5fjF1SF_2GTxtAWRmWYU",
    authDomain: "message-board-4ccfa.firebaseapp.com",
    projectId: "message-board-4ccfa",
    storageBucket: "message-board-4ccfa.firebasestorage.app",
    messagingSenderId: "518085117356",
    appId: "1:518085117356:web:b5fcc7ec923c1deb31a609"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const postBtn = document.getElementById("postBtn");
const board = document.getElementById("messageBoard");

const messageInput = document.getElementById("message");
const charCount = document.getElementById("charCount");

const darkBtn = document.getElementById("darkModeBtn");

const messageCount =
    document.getElementById("messageCount");

const search =
    document.getElementById("search");

loadMessages();

postBtn.addEventListener("click", async () => {

    const name =
        document.getElementById("name").value;

    const message =
        document.getElementById("message").value;

    if (!name || !message) {
        alert("Fyll i alla fält");
        return;
    }

    await addDoc(collection(db, "messages"), {
        name,
        message,
        date: new Date().toLocaleString()
    });

    document.getElementById("name").value = "";
    document.getElementById("message").value = "";

    charCount.textContent =
        "0 / 200 tecken";

    loadMessages();
});

messageInput.addEventListener("input", () => {

    charCount.textContent =
        `${messageInput.value.length} / 200 tecken`;
});

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle(
        "dark-mode"
    );
});

search.addEventListener("input", () => {

    const cards =
        document.querySelectorAll(".message");

    cards.forEach(card => {

        const text =
            card.textContent.toLowerCase();

        card.style.display =
            text.includes(
                search.value.toLowerCase()
            )
                ? "block"
                : "none";
    });
});

async function loadMessages() {

    board.innerHTML = "";

    let count = 0;

    const snapshot =
        await getDocs(
            collection(db, "messages")
        );

    snapshot.forEach(doc => {

        count++;

        const data = doc.data();

        const div =
            document.createElement("div");

        div.classList.add("message");

        div.innerHTML = `
            <h3>${data.name}</h3>
            <p>${data.message}</p>
            <small>${data.date}</small>
        `;

        board.prepend(div);
    });

    messageCount.textContent =
        `Totalt antal meddelanden: ${count}`;
}