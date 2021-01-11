var p1Total = 0
var p2Total = 0
var roundTotal = 0

function clickRoll(player) { 
    var a =  (Math.floor(Math.random() * 6) + 1)
    var b =  (Math.floor(Math.random() * 6) + 1)
    var x = "Your roll is " + a
    var y = "Your second roll is " + b
    document.getElementById("p"+player+"Roll").innerText = x + "\n" + y
    scores(player, a, b)
}


function scores(player, a, b) {
    switch (player) {
        case "1":
            p1Total += a + b
            break;
        case "2":

            break;
    }
    roundTotal = roundTotal + a + b

    document.getElementById("score1").innerText = p1Total
}
