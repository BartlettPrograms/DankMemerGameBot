"use strict"

const { keyboard, Key, mouse, left, right, up, down, straightTo, centerOf, Region, sleep, Point} = require("@nut-tree/nut-js")

const farmingValues = ["fish", "hunt", "dig", "beg", "highlow"]
// Wait times
const waitDiscordTextDetect = 3000
const waitNetworkSpeedTimer = 3000
const waitHighLowTimer = 3000
const waitDankMemerCooldown = 36000
// Positions
const posMessageBar = new Point(520, 1000)
const posHighLowJackpotButton = new Point(520, 930)



// Typing function
const typing = async (str, wait) => {
    await mouse.move(
        straightTo (posMessageBar)
        )
    await mouse.leftClick()
    await keyboard.type("/" + str)
    await keyboard.type(Key.Enter)
    await keyboard.type(Key.Enter)
}



mainLoop();



// Main Loop
const mainLoop = async () =>
{
    await typing(farmingValues[0], waitDiscordTextDetect)
    await typing(farmingValues[1], waitDiscordTextDetect)
    await typing(farmingValues[2], waitDiscordTextDetect)
    await typing(farmingValues[3], waitDiscordTextDetect)
    setTimeout(callHighlow, waitNetworkSpeedTimer)
}
//Calls highlow
const callHighlow = async () =>
{
    await keyboard.type(Key.Enter)
    await keyboard.type(Key.Enter)
    await typing(farmingValues[4], waitDiscordTextDetect)
    setTimeout(doHighlow, waitHighLowTimer)
}
//Completes highlow task
const doHighlow = async () => 
{
    await mouse.move(
    straightTo (posHighLowJackpotButton)
    )

    await mouse.leftClick()
    setTimeout(mainLoop, waitDankMemerCooldown)
}






/*
const square = async () => {
  await mouse.move(right(500));
  await mouse.move(down(500));
  await mouse.move(left(500));
  await mouse.move(up(500));
};

(async () => {
    await square();
    await mouse.move(
        straightTo(
            centerOf(
                new Region(100, 100, 200, 300)
            )
        )
    );
})();
*/
