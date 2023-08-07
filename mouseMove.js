const robot = require('robotjs');

const { exec } = require("child_process");



exec('open -a "Freeform"', (error, stdout, stderr) => {

    if (error) {

        console.log(`Error: ${error}`);
        return;
    }

    if (stderr) {

        console.log(`stderr: ${stderr}`)
    }
    console.log(`stdout: ${stdout}`)
})



const mousePostion = robot.getMousePos();

console.log(mousePostion);


// Speed up the mouse.
robot.setMouseDelay(2);

const twoPI = Math.PI * 2.0;
const screenSize = robot.getScreenSize();
const height = (screenSize.height / 2) - 10;
const width = screenSize.width;

for (let x = 0; x < width; x++) {
    y = height * Math.sin((twoPI * x) / width) + height;
    robot.moveMouse(x, y);
}

robot.moveMouse(1360, 210);
robot.mouseClick();

setTimeout(() => {
    robot.moveMouse(1287, 221);
    robot.mouseClick();
}, 1000);  // 1000 milliseconds = 1 second

setTimeout(() => {
    robot.typeString("Thanks for everyone at relative path for showing me how to use the terminal, I'm well on my way to being a dev ops node engineer.");
}, 4500);





