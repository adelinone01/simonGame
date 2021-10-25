var buttonColours = ["red", "blue", "green", "yellow"];
var buttonPress;
var gameLevel = 0;
var gamePattern = [];
var userClickedPattern = [];
var indexCurrentColor = 0;

//FUNCTIONS
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColours[randomNumber]);

  animatePress(buttonColours[randomNumber]);
  playSound(buttonColours[randomNumber]);

  gameLevel++;
  $("h1").text("Level " + gameLevel);

}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){ // verify patter
    if ((currentLevel+1) === gameLevel){
      setTimeout(function() {
          nextSequence();
      }, 500);
      userClickedPattern = [];
      indexCurrentColor = 0;
    }
    else{
      indexCurrentColor ++;
    }

  }
  else{
    $("body").addClass( "game-over"); //set grafic for game over
    $("h1").text("Game Over");

    setTimeout(function() {
      $("body").removeClass("game-over");
      $("h1").text("Click here to Start");
    }, 300);

    startOver(); // restart game

  }
}

function startOver(){

  gameLevel = 0;
  gamePattern = [];
  userClickedPattern = [];
  indexCurrentColor = 0;

}

function playSound(name) {
  //set audio
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

function animatePress(currentColour) {
  //set transparancy

  $("."+currentColour).addClass( "pressed");

  setTimeout(function() {
    $("."+currentColour).removeClass("pressed");
  }, 100);

}



//EVENTS
//keyboard press
// $(document).keypress(function(event){
//  if(("a" === event.key)||("A" === event.key))
//  $("h1").text("Level " + gameLevel);
//  nextSequence();
// });

//click to start
$("h1").click(function(){
 if($("h1").text() === "Click here to Start")
{ $("h1").text("Level " + gameLevel);
 nextSequence();}

});



//on screen button
$(".btn").click(function() {

  buttonPress = $(this).attr('id');

  animatePress(buttonPress);
  playSound(buttonPress);

    //save press button in an array
    var userChosenColour = buttonPress;
    userClickedPattern.push(userChosenColour);

  checkAnswer(indexCurrentColor);


});
