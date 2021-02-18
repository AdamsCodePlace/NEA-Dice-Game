var p1Total = 0
var p2Total = 0
var Round = 0
var tie = false
var Double = false
var p1Round = 0
var p2Round = 0
var rounds = 1
var roundScore = 0
var totalScore = 0



function buttondis1() {
    if (p1Round >= 0) {
        if (Double == false) {
            p1Round = 0
            document.getElementById("Button").disabled = true
            document.getElementById("Button2").disabled = false
        } else {
            document.getElementById("Button").disabled = false
            document.getElementById("Button2").disabled = true
        }

    }

}

function buttondis2() {
    if (p2Round >= 0) {
        if (Double == false) {
            p2Round = 0
            document.getElementById("Button2").disabled = true
            document.getElementById("Button").disabled = false
        } else {
            document.getElementById("Button2").disabled = false
            document.getElementById("Button").disabled = true
        }

    }

}


function clickRoll(player) {
    if (Double == true) {
        var a = (Math.floor(Math.random() * 6) + 1)
        var x = "Your roll is " + a
        switch (player) {
            case "1":
                p1Total += a
                document.getElementById("score1").innerText = p1Total
                break;
            case "2":
                p2Total += a
                document.getElementById("score2").innerText = p2Total
                break;
        }
        document.getElementById("p" + player + "Roll").innerText = x
        document.getElementById("winner").innerText = "Continue with player two's go"
        Double = false
        scores(player, a, 0)
    } else {
        if (tie == false) {
            var a = (Math.floor(Math.random() * 6) + 1)
            var b = (Math.floor(Math.random() * 6) + 1)
            Round += 1
            var x = "Your roll is " + a
            var y = "Your second roll is " + b
            document.getElementById("p" + player + "Roll").innerText = x + "\n" + y
            scores(player, a, b)
        } else {
            if (Round >= 3) {
                Round = 0
            }
            var a = (Math.floor(Math.random() * 6) + 1)
            Round += 1
            var x = "Your roll is " + a
            document.getElementById("p" + player + "Roll").innerText = x
            scores(player, a, 0)
        }
    }

}


function scores(player, a, b) {
    switch (player) {
        case "1":
            console.log(rounds)
            roundScore = a + b
            totalScore += roundScore
            if (Double == false) {
                p1Round += 1
            }
            p1Total += a + b
            if (a % 2 == 0) {
                p1Total += 10
            } else {
                p1Total = p1Total - 5
            }
            if (b % 2 == 0) {
                p1Total += 10
            } else {
                p1Total = p1Total - 5
            }
            if (a == b) {
                document.getElementById("winner").innerText = "Player one rolled a double, roll one dice again"
                Double = true
            }
            if (p1Total < 0) {
                p1Total = 0
            }
            document.getElementById("score1").innerText = p1Total
            rounds += 1
            if (tie == false) {
                if (Round >= 10) {
                    winning(p1Total, p2Total)
                } else {
                    buttondis1()
                }
            } else {
                if (Round >= 2) {
                    winning(p1Total, p2Total)
                }
            }

            break;
        case "2":
            roundScore = a + b
            totalScore += roundScore
            console.log(rounds)
            p2Round += 1
            p2Total += a + b
            if (a % 2 == 0) {
                p2Total += 10
            } else {
                p2Total = p2Total - 5
            }

            if (b % 2 == 0) {
                p2Total += 10
            } else {
                p2Total = p2Total - 5
            }

            if (p2Total < 0) {
                p2Total = 0
            }
            document.getElementById("score2").innerText = p2Total
            document.getElementById("roundScores").innerText = totalScore
            totalScore = 0
            rounds = rounds + 1
            if (tie == false) {
                if (Round >= 10) {
                    winning(p1Total, p2Total)
                } else {
                    buttondis2()
                }
            } else {
                if (Round >= 2) {
                    winning(p1Total, p2Total)
                }
            }

            break;
    }
}

function winning(p1Total, p2Total) {
    if (p1Total > p2Total) {
        document.getElementById("winner").innerText = "The winner is player one with a score of " + p1Total
        storage()
    } else if (p2Total > p1Total) {
        document.getElementById("winner").innerText = "The winner is player two with a score of " + p2Total
        storage()
    } else {
        tie = true
        while (tie == true) {
            document.getElementById("winner").innerText = "There is a tie roll again. Only one dice will be rolled this time"
            break;

        }
    }

}

function storage() {
    if (p1Total > p2Total) {
        db.collection("data").add({
            "email": firebase.auth().currentUser.email,
            "name": document.getElementById("p1Name").value,
            "score": document.getElementById("score1").innerText
        })
    } else {
        db.collection("data").add({
            "email": firebase.auth().currentUser.email,
            "name": document.getElementById("p2Name").value,
            "score": document.getElementById("score2").innerText
        })
    }
}

function getTopFive() {
    db.collection("data").orderBy("score", "desc").limit(5).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var row = document.getElementById("leaderboard").insertRow(-1)
            row.insertCell(0).innerText = doc.data().name
            row.insertCell(1).innerText = doc.data().score
        });
    });

}

var modal = document.getElementById("myModal");

function openModal(text) {
    modal.style.display = "block";
    document.getElementById("modalText").innerText = text
}

// When the user clicks on <span> (x), close the modal
document.getElementsByClassName("close")[0].onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

getTopFive()