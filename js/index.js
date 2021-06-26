// Create an array to store the colors 
var buttonColors = ["green", "red", "yellow", "blue"];

// Create an array to store game pattern
var gamePattern = [];

// Create an array to store user clicked pattern
var userClickedPattern = [];

// Create a variable to store game state (whether the game has started or not)
var gameStarted = false;

// Create a variable to store game level

var gameLevel = 0;

// check for any keypress to start the game 
$(document).keypress(function() {
    // Check if the game has started already
    if(!gameStarted){
        // Get nextSequence
        nextSequence();

        // Set gameStarted to true
        gameStarted = true;
    }
});

// Listen for button clicks 
$(".btn").click(function() {
    // Find which button color got clicked
    var choosenButtonColor = $(this).attr("id");

    // Add the chosen button color to userClickedPattern array
    userClickedPattern.push(choosenButtonColor);

    // Play the respective sound for the clicked button color
    playSound(choosenButtonColor);

    // Animate Button Pressed
    animateButtonPress(choosenButtonColor);

    // Get the last added element from the userClickedArray
    var lastClicked = userClickedPattern.length - 1;

    // Check if user clicked pattern is correct
    checkPattern(lastClicked);

});

function nextSequence(){
    // Reset userClickedPattern
    userClickedPattern = [];

    // Get a random number between 0-3
    var randomNumber = Math.floor(Math.random() * 4);

    // Get a color from buttonColors array using the random number
    var randomColor = buttonColors[randomNumber];

    // Add randomColor to gamePattern
    gamePattern.push(randomColor);

    // Play audio for the randomColorButton
    playSound(randomColor);

    // Animate the random color button
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

    // Increment the game level and change the title to the game level
    gameLevel++;

    $(".title").text("Level " + gameLevel);
}

function checkPattern(lastClicked){
    if(gamePattern[lastClicked] === userClickedPattern[lastClicked]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }else{
        // Play wrong sound
        playSound("wrong");

        // Change the title text to game over
        $(".title").text("Game Over, Press Any Key to Restart");

        // Animate wrong background
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100);

        // Reset the game (set gamePattern array to empty, gameLevel to 0 and gameStarted to false)
        resetGame();
    }
}   

function resetGame() {
    gamePattern = [];
    gameLevel = 0;
    gameStarted = false;
}

function playSound(soundName){
    var audio = new Audio("sounds/" + soundName + ".mp3");
    audio.play();
}

function animateButtonPress(chosenColor){
    $("#" + chosenColor).addClass("pressed");

    setTimeout(function(){
        $("#" + chosenColor).removeClass("pressed");
    }, 100);
}