const firebaseConfig = {
  apiKey: "AIzaSyBf6SbXKOyccUQSky0L6LWnR8IyxktyEf4",
  authDomain: "kwiteradv.firebaseapp.com",
  databaseURL: "https://kwiteradv-default-rtdb.firebaseio.com",
  projectId: "kwiteradv",
  storageBucket: "kwiteradv.appspot.com",
  messagingSenderId: "955924527297",
  appId: "1:955924527297:web:9261f503b7c386dba6bc40",
};

// Initialize Firebase
// no  firebase vai  estar const  app, nos  vamos trocar para firebase.
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML =
  "Bem-vindo(a), " + user_name + "!";

function addRoom() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adicionando nome da sala",
  });

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}

function getData() {
  firebase
    .database()
    .ref("/")
    .on("value", function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        Room_names = childKey;
        console.log("Nome da sala: " + Room_names);
        row =
          "<div class='room_name' id=" +
          Room_names +
          " onclick='redirectToRoomName(this.id)' >#" +
          Room_names +
          "</div><hr>";
        document.getElementById("output").innerHTML += row;
      });
    });
}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "kwitter.html";
}
