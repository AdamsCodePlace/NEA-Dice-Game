
var p1Total = 0
var p2Total = 0
var Round = 0

function clickRoll(player) {
    var a = (Math.floor(Math.random() * 6) + 1)
    var b = (Math.floor(Math.random() * 6) + 1)
    Round += 1
    var x = "Your roll is " + a
    var y = "Your second roll is " + b
    document.getElementById("p" + player + "Roll").innerText = x + "\n" + y
    scores(player, a, b)
}


function scores(player, a, b) {
    switch (player) {
        case "1":
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

            if (p1Total < 0) {
                p1Total = 0
            }
            document.getElementById("score1").innerText = p1Total
            if( Round >= 10){
                winning(p1Total, p2Total)
            }
            break;
        case "2":
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
            if( Round >= 10){
                winning(p1Total, p2Total)
            }
            break;
    }
}

function winning(p1Total, p2Total) {
    if (p1Total > p2Total) {
        document.getElementById("winner").innerText = "The winner is player one with a score of " + p1Total
    } else {
        document.getElementById("winner").innerText = "The winner is player two with a score of " + p2Total
    }

}
