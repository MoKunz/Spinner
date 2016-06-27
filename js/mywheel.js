/*var numSegments = 4;
var segments = [
    {'fillStyle' : '#747474', 'text' : 'Pen/Eraser'},
    {'fillStyle' : '#43A5F6', 'text' : 'True Money'},
    {'fillStyle' : '#FF4180', 'text' : 'Thank You'},
    {'fillStyle' : '#FED352', 'text' : 'Flash Drive'}
];
var theWheel = new Winwheel({
    'canvasId'    : 'myCanvas',
    'numSegments' : numSegments,
    'fillStyle'   : '#FED352',
    'lineWidth'   : 2,
    'segments' : segments
});*/

// Create new wheel object specifying the parameters at creation time.
var theWheel = new Winwheel({
    'canvasId' : 'myCanvas',
    'strokeStyle' : '#DDDDDD',
    'lineWidth'   : 1,
    'numSegments'  : 3,     // Specify number of segments.
    'outerRadius'  : 212,   // Set outer radius so wheel fits inside the background.
    'textFontSize' : 28,    // Set font size as desired.
    'segments'     :        // Define segments including colour and text.
        [
            {'fillStyle' : '#EB4C56', 'text' : 'Prize 1'},
            {'fillStyle' : '#07A5AB', 'text' : 'Prize 2'},
            {'fillStyle' : '#A37752', 'text' : 'Prize 3'}
        ],
    'animation' :           // Specify the animation to use.
    {
        'type'     : 'spinToStop',
        'duration' : 5,     // Duration in seconds.
        'spins'    : 8,     // Number of complete spins.
        'callbackFinished' : 'alertPrize()'
    }
});

// Probability function
function getStopAngle(){
    return 360*Math.random();
}

theWheel.animation.stopAngle = getStopAngle();

// Vars used by the code in this page to do power controls.
var wheelPower    = 0;
var wheelSpinning = false;
// -------------------------------------------------------
// Function to handle the onClick on the power buttons.
// -------------------------------------------------------
function powerSelected(powerLevel)
{
    // Ensure that power can't be changed while wheel is spinning.
    if (wheelSpinning == false)
    {
        // Reset all to grey incase this is not the first time the user has selected the power.

        // Now light up all cells below-and-including the one selected by changing the class.

        // Set wheelPower var used when spin button is clicked.
        wheelPower = powerLevel;

        // Light up the spin button by changing it's source image and adding a clickable class to it.
        document.getElementById('spin_button').src = "spin_on.png";
        document.getElementById('spin_button').className = "clickable";
    }
}


// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin()
{
    // Ensure that spinning can't be clicked again while already running.
    if (wheelSpinning == false)
    {
        // Based on the power level selected adjust the number of spins for the wheel, the more times is has
        // to rotate with the duration of the animation the quicker the wheel spins.
        if (wheelPower == 1)
        {
            theWheel.animation.spins = 3;
        }
        else if (wheelPower == 2)
        {
            theWheel.animation.spins = 8;
        }
        else if (wheelPower == 3)
        {
            theWheel.animation.spins = 15;
        }

        // Disable the spin button so can't click again while wheel is spinning.
        document.getElementById('spin_button').innerHTML = "Spinning....";
        document.getElementById('spin_button').className = "spin-button";
        console.log("1234");
        // Begin the spin animation by calling startAnimation on the wheel object.
        theWheel.startAnimation();

        // Set to true so that power can't be changed and spin button re-enabled during
        // the current animation. The user will have to reset before spinning again.
        wheelSpinning = true;
    }
}

// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------
function resetWheel()
{
    theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    theWheel.draw();                // Call draw to render changes to the wheel.

    wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
}

// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters.
// -------------------------------------------------------
function alertPrize()
{
    // Get the segment indicated by the pointer on the wheel background which is at 0 degrees.
    var winningSegment = theWheel.getIndicatedSegment();
    $("#spin_button").text("Done!");
    bootbox.dialog({
        message: "You have won " + winningSegment.text + ".",
        title: "Prize result!",
        buttons: {
            main: {
                label: "Close",
                className: "btn-primary"
            }
        }
    });
}
