//define vars
var clicks = 0 ;
var clickWorth = 1;
var shiftWidth = 0;
var shiftHeight = 0;
var mod = 2;
var pandaName = "";
// images
var images = 
["assets/stage1.png", 
"assets/stage2.png", 
"assets/stage3.png", 
"assets/stage4.png",
"assets/stage5.png"];

//count clicks
onEvent("pandaPic", "click", function( ) {
  addClick();
});

//clicking the "start" button prompts the player to name their panda
onEvent("startButton", "click", function( ) {
  playSound("assets/category_app/app_button_click_1.mp3", false);
  setScreen("nameScreen");
});

//When "begin game" button clicked starts the game and shows instrutions
onEvent("startClicker_button", "click", function( ) {
  playSound("assets/category_app/app_button_click_1.mp3", false);
  if (getText("nameInput") == "") {
    pandaName = "Oatmeal";
  } else {
    pandaName = getText("nameInput");  
  }
  newGame();
  help();
});

//help button show instrutions when clicked 
onEvent("helpButton", "click", function( ) {
  help();
  bounceButton(45, 30, "helpButton");
});

//sends user to the upgrade screen
onEvent("upgradeButton", "click", function( ) {
  setScreen("upgradeScreen");
  hideElement("upgradeError");
  hideElement("upgradeError_Return");
  playSound("assets/category_app/app_button_click_1.mp3", false);
});

//Should send back to home screen
onEvent("homeButton", "click", function( ) {
 goHome();
});

//from upgrade to clicker screen
onEvent("backButton", "click", function( ) {
  setScreen("clickerScreen");
  playSound("assets/category_app/app_button_click_1.mp3", false);
});

// doubles the click worth up till click worth is 16
onEvent("doubleClicks", "click", function( ) {
  if (clicks>=50) {
  clickWorth = clickWorth*2;
  clicks = clicks - 50;
  setText("clicksDisplay", "clicks: "+ clicks);
  playSound("assets/category_alerts/vibrant_game_shutter_alert_1_short_quick.mp3", false);
  bounceButton(135, 40, "doubleClicks");
  } else {
  playSound("assets/category_digital/failure.mp3", false);
}
  if (clickWorth >= 16) {
    hideElement("doubleClicks");
  }
});

// Upgrade Screen Button area
onEvent("upgradePanda_100", "click", function( ) {
  updateBuy(100, 1, 200);
});

onEvent("upgradePanda_200", "click", function( ) {
  updateBuy(200, 2, 500);
  if(clicks >= 200){
    hideElement("upgradePanda_100");
    showElement("upgradePanda_500");
  }
});

onEvent("upgradePanda_500", "click", function( ) {
  updateBuy(500, 3, 1000);
  if(clicks >= 500){
    hideElement("upgradePanda_100");
    hideElement("upgradePanda_200");
    showElement("upgradePanda_1000");
  }
});

onEvent("upgradePanda_1000", "click", function( ) {
  updateBuy(1000, 4, 2000);
  if (getImageURL("pandaPic").includes("stage5")) {
    showElement("labelContinue");
    showElement("labelWin");
    }
});

onEvent("upgradeError_Return", "click", function( ) {
  hideElement("upgradeError");
  hideElement("upgradeError_Return");
  playSound("assets/category_app/app_button_click_1.mp3", false);
});

// functions
function addClick() {
  clicks = clicks+clickWorth;
  setText("clicksDisplay", "clicks: "+clicks);
  playSound("assets/category_app/app_button_1.mp3", false);
  hideElement("clickInstructions");
  hideElement("upgradeInstructions");
  hideElement("doubleInstructions");
  hideElement("homeInstructions");
  hideElement("labelContinue");
  hideElement("labelWin");
}

function updatePanda(imageId) {
  setImageURL("pandaPic", images[imageId]);
  setText("clicksDisplay", "clicks: "+clicks);
}

function updateError(){
    showElement("upgradeError");
    showElement("upgradeError_Return");
    playSound("assets/category_digital/failure.mp3", false);
}

function updateBuy(price, imageId, nextId){
  if(clicks >= price){
    playSound("assets/category_app/app_button_click_1.mp3", false);
    updatePanda(imageId);
    playSound("assets/category_alerts/vibrant_game_shutter_alert_1_short_quick.mp3", false);
    hideElement("upgradePanda_"+price);
    if (nextId<=1000) {
      showElement("upgradePanda_"+nextId);
    }
    clicks = clicks - price;
} else{
    updateError();
  }
}

function bounceButton(keepWidth_Value, keepHeight_Value, buttonID){
  mod = 2;
  playSound("assets/category_app/app_button_click_1.mp3", false);
  shiftWidth = keepWidth_Value;
  shiftHeight = keepHeight_Value;
  timedLoop(50, function() {
    setSize(buttonID, shiftWidth, shiftHeight);
    shiftWidth = shiftWidth + mod;
    shiftHeight = shiftHeight + mod;
    mod = mod+2;
    if (mod == 8) {
      stopTimedLoop();
      setSize(buttonID, keepWidth_Value-1, keepHeight_Value-1);
      setTimeout(function() {
        setSize(buttonID, keepWidth_Value, keepHeight_Value);
      }, 50);
     }
  });}

function newGame(){
  setScreen("clickerScreen");
  setImageURL("pandaPic", images[0]);
  showElement("doubleClicks");
  playSound("assets/category_app/app_button_click_1.mp3", false);
  hideElement("labelWin");
  hideElement("labelContinue");
  showElement("upgradePanda_100");
  clicks = 0;
  setText("clicksDisplay", "clicks: ");
  hideElement("upgradePanda_200");
  hideElement("upgradePanda_500");
  hideElement("upgradePanda_1000");
  clickWorth = 1;
  setText("labelContinue", "KEEP CLICKING on " + pandaName + " to continue, or GO HOME TO RESTART");
  setText("clickInstructions", "just click on " + pandaName);
  setText("upgradeInstructions", "upgrade " + pandaName + " here!");
  
}

function help(){
  showElement("clickInstructions");
  showElement("upgradeInstructions");
  showElement("doubleInstructions");
  showElement("homeInstructions");
}

function goHome(){
  setScreen("homeScreen");
  playSound("assets/category_app/app_button_click_1.mp3", false);
}


