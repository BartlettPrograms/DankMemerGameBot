"use strict";

const {
  clipboard,
  keyboard,
  Key,
  mouse,
  left,
  right,
  up,
  down,
  straightTo,
  centerOf,
  Region,
  sleep,
  Point,
  Button,
} = require("@nut-tree/nut-js");

//Values
//Important click points
const posMessageBar = new Point(520, 1000);
const posTotalPointsRight = new Point(465, 818);
const posTotalPointsLeft = new Point(437, 818);
const posStandButton = new Point(500, 890);
const posHitButton = new Point(410, 890);
const posPlayAgainButton = new Point(450, 930);
//Regions
const ScreenCapRegion = new Region(380, 905, 350, 50);
//Timers
const waitGameLoadTimer = 1000;
const WaitMainLoopComplete = 100;
const PauseTimer = 1000;

// Methods
// basic type and enter method
const typing = async (str) => {
  await mouse.move(straightTo(posMessageBar));
  await mouse.leftClick();
  await keyboard.type(str);
  await sleep(PauseTimer);
  await keyboard.type(Key.Enter);
};

// method to start blackjack game
const startGame = async () => {
  // Click Message bar and type /blackjack bet 5k
  console.log("Starting Blackjack Game...");
  await typing("/blackj");
  await keyboard.type("5k");
  await keyboard.type(Key.Enter);
  await mouse.move(straightTo(posTotalPointsLeft));
};
// Method to highlight and copy total card points
// returns int of current points, or 0 if game has a game over response
const GetPoints = async () => {
  await mouse.drag([posTotalPointsLeft, posTotalPointsRight]);
  await keyboard.pressKey(Key.LeftControl, Key.C);
  await keyboard.releaseKey(Key.LeftControl, Key.C);
  let points = await clipboard.paste();
  if (Number.isInteger(parseInt(points)));
  {
    return parseInt(points);
  }
  return 0;
};

const PlayAgain = async () => {
  await mouse.move(straightTo(posPlayAgainButton));
  await mouse.leftClick();
  await mouse.move(straightTo(posTotalPointsLeft));
  setTimeout(MainLoop, waitGameLoadTimer);
};

//Main Loop
const MainLoop = async () => {
  // If arg == -s start blackjack game
  if (process.argv[2] == "-s") {
    await startGame();
    process.argv[2] = "";
  }

  await sleep(waitGameLoadTimer);
  let points = await GetPoints();
  if (points > 0) {
    // points are probably reasonable to work with
    // Decide what move to make here
    if (points < 17) {
      // press Hit button
      await mouse.move(straightTo(posHitButton));
    } else if (points >= 17 && points <= 21) {
      // press Stand Button
      await mouse.move(straightTo(posStandButton));
    }
    await mouse.leftClick();
    await mouse.move(straightTo(posTotalPointsLeft));
    setTimeout(MainLoop, WaitMainLoopComplete);
  } else {
    // Most likely, game over
    // Click Play again, then sleep and restart MainLoop()
    PlayAgain();
  }
};

//Start Execution here
MainLoop();
