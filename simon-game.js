let buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
let gamePattern = [];
var userClickedPattern = [];
var gameOver = 'Game Over';

$('.game-btn').click(function () { 
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    $(this).addClass(userChosenColour);
    setTimeout(()=>{
        $(this).removeClass(userChosenColour);
    },100);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(()=>{
                nextSequence();
            }, 1000);
        }
    } else{
        playSound('wrong');
        $('body').addClass("game-over");
        setTimeout(()=>{
            $('body').removeClass("game-over");
        },200);
        $('#level-id').text(gameOver);
    }
}
function nextSequence() {
    userClickedPattern = [];
    level ++;
    $(".pop-up-container").css("display", "none");
    $('span').text(level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    function addCustomClass() {
        let newClass = "";
        if (randomChosenColour == 'red'){
            newClass = 'red';
        } else if(randomChosenColour == 'blue'){
            newClass = 'blue';
        } else if(randomChosenColour == 'yellow'){
            newClass = 'yellow';
        } else if(randomChosenColour == 'red'){
            newClass = 'red';
        } else{
            newClass = 'green';
        }
        return newClass;
    }
    $("#"+randomChosenColour).addClass(addCustomClass());
    setTimeout(function(){
        $("#"+randomChosenColour).removeClass(addCustomClass());
    },250);
    playSound(randomChosenColour);
}
function startover() {
    gamePattern = [];
    level = 0;
    $('#level-id').html("Level <span>" + level + "</span>" );
    nextSequence();
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};