var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []

var level = 0
var startedOnPress = false


$(document).keypress(function (event) {
    if (startedOnPress === false) {
        newSequence() // level instantly increases
        startedOnPress = true
    }
});


$(".btn").click(function(e){
    if (startedOnPress === true) {  // if game started
    var idClicked = e.target.id;
    userClickedPattern.push(idClicked)
    animatePress(idClicked)
    playSound(idClicked)

    if (userClickedPattern.length === gamePattern.length) {
        var same = checkAnswer(userClickedPattern)

        setTimeout(function(){
            if (same) {
                console.log("nice")
                userClickedPattern = []
                setTimeout(function () {
                    newSequence()
                }, 1000);
            } else {
                gameOver()
            }
        }, 500);

    }

    }
});


function newSequence() {
    level += 1
    $("h1").text("Level " + level)
    console.log("Current level " + level)

    var randomNumber = Math.floor((Math.random() * 4));
    
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log("Current game pattern: ");
    console.log(gamePattern);

    var selectorPattern = "#" + randomChosenColour;
    $(selectorPattern).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)

    /* $("button").click(function (event) {
        console.log(event)
    }) */
}


function playSound (color) {
    var musicPattern = "./sounds/" + color + ".mp3";
    var audio = new Audio(musicPattern);
    audio.play();
}


function animatePress (currentColor, delay=100) {
    $("#" + currentColor).addClass('pressed').delay(delay).queue(function() {
        $("#" + currentColor).removeClass('pressed')
        $(this).dequeue();
    });
}


function checkAnswer (pattern) {
    console.log("User clicked pattern: ");
    console.log(pattern);
    console.log(typeof(gamePattern[0]) + ", " + typeof(pattern[0]));

    var areSame = false;
    for (var i = 0; i < gamePattern.length; i++) {
        if (pattern[i] === gamePattern[i]) {
            areSame = true;
        } else {
            areSame = false;
            break
        }
    }

    return areSame
}


function gameOver () {
    $("h1").text("Game over, refresh the page :)")
    level = 0
    startedOnPress = false
    gamePattern = []
    playSound("wrong")
}


/* setTimeout(function(){


}, 500); */
