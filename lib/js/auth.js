function signIn() {
    firebase.auth().signInWithEmailAndPassword(document.getElementById("emailSignUp").value, document.getElementById("passSignUp").value)
    .then((user) => {
        // Signed in 
        // ...
        document.location = "game.html"
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById("logInError").innerText = "Access denied"
        // ..
    });
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      if (window.location.pathname.split("/").pop() == "index.html") {
        document.location.href = "game.html"
    }
    } else {
        if (window.location.pathname.split("/").pop() == "game.html") {
            document.location.href = "index.html"
        }
    }
  });

