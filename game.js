let gamePattern = [];

let userClickedPattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let level = 0;

var started = false;

$(document).keydown(function() {
  if (started == false) {

    nextSequence();
    $("h1").text("level " + level);
    started = true;
  }

});

$(".btn").click(function() {

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {


    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {
    let wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $('body').addClass("game-over");
    setTimeout(function(){
      $('body').removeClass("game-over");}, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver()
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started =  false;

}


function nextSequence() {

  userClickedPattern = [];

  level++;


  $("h1").text("level " + level);

  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  checkAnswer(randomChosenColour);
}


function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  var activeButton = $("#" + currentColour);
  activeButton.addClass("pressed");
  setTimeout(function() {
    activeButton.removeClass("pressed");
  }, 100);
}
