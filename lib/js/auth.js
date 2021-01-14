function signIn() {
    firebase.auth().signInWithEmailAndPassword(document.getElementById("emailSignUp").innerText, document.getElementById("passSignUp").innerText)
    .then((user) => {
        // Signed in 
        // ...
        document.location = "game.html"
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
    });
}

function login() {

}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      document.location = "game.html"
    } else {
        if (window.location.pathname.split("/").pop() == "game.html") {
            document.location.href = "index.html"
        }
    }
  });