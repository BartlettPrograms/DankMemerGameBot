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
const postHitButton = new Point(410, 890);
//Regions
const ScreenCapRegion = new Region(380, 905, 350, 50);
//Timers
const waitGameLoadTimer = 4000;
const PauseTimer = 1000;

// Methods
// basic type and enter method
const typing = async (str) => {
  await mouse.move(straightTo(posMessageBar));
  await mouse.leftClick();
  await keyboard.type(str);
  await sleep(1000);
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
  await sleep(waitGameLoadTimer);
};

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

//Main Loop
(async () => {
  // If arg == -s start blackjack game
  if (process.argv[2] == "-s") {
    await startGame();
  }

  let points = await GetPoints();
  console.log(points);
  if (points > 0) {
    // points are probably reasonable to work with
    if (points < 17) {
      // press Hit button
      await mouse.move(straightTo(postHitButton));
    } else if (points >= 17 && points <= 21) {
      // press Stand Button
      await mouse.move(straightTo(posStandButton));
    }
    await mouse.leftClick();
  }
  //press play again button
  // Look for green play again button, if found
  //{ press play again buton, restart loop }
  // if no green win button
  // Detect card number
})();
