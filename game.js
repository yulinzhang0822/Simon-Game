
var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["green", "red", "yellow", "blue"];

var level = 0;

// Detect key pressing
$(document).keypress(function() {
  if(level === 0) {
    $("#level-title").text("Game Started");
    setTimeout(function() {
      nextSequence();
    },2000);
  }
});

// Detect mouse click
$(".btn").click(function(event) {
  // Get the id of the button clicked
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  // Increase the level by 1
  level++;
  // Update the h1 level-title
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // Effect of flash on a button
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  // Code to be executed after 0.1 second
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Check if the most recent button clicked matches the most recent random button
function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // Check if the user has finished the current sequence
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Game Over");
    // Play Game Over Sound
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
}
