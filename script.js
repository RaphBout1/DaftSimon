var gameSequence = [];
var playerSequence = [];
var cmpt = 0;
var level = 0;
var game = false;
var numberPadPlayed;

function init(){
    $(".pad").click(function () {
      if(game){
        animation($(this))
        playerSequence.push($(this))
        verify();
      }
    });

    $(".circle").click(function () {

      if (!game){
        nextLevel();
        game = true;
        $(".level").css("color", "white");
      }
      
        
    });
}

// pad animation and color text
function animation(pad){
    pad.animate(
        {
          opacity: "1",
        },
        450
      )
      .animate(
        {
          opacity: "0.4",
        },
        {
          duration: 200,
        }
      );
    audio = pad.children();
    audio.trigger("play");
    let couleur = pad.css("background-color");
    $("header").css("color",couleur );
}

//check if it's correct answers
function verify(){
  if(playerSequence[numberPadPlayed].data('pad') === gameSequence[numberPadPlayed].data('pad')){

    if (gameSequence.length == playerSequence.length){
      nextLevel();
    }else{
      numberPadPlayed++;
    }
  }else{
end();



  }

}

//play level sequence with delay
function playLevel(){
    delay = setInterval(playSequence, 700);
}


function playSequence() {
    if (cmpt < gameSequence.length) {
      animation(gameSequence[cmpt]);
      cmpt++;
    } else {
      clearInterval(delay);
      cmpt = 0;
    }
  }



  function nextLevel(){
    playerSequence = [];
    gameSequence.push($(".pad").eq(random()));  
    playLevel();
    level++;
    numberPadPlayed = 0;
    $(".level").html("Level " + level);

  }

  //lose the game
  function end() {
    game = false;
    $(".level").css("color", "red");
    $(".level").html("RETRY");
    gameSequence = [];
    playerSequence = [];
    numberPadPlayed = 0;
    level = 0;
  }

  //random int
  function random() {
    return Math.floor(Math.random() * 4);
  }