// Variables
var bdayName = "Nessy";
var happyBdayText = document.getElementById("congratz");
var sparkle = {
	duration: 150,
	size: 13,
}
var straw = document.getElementById("straw");
var blown = false;
var actionSpot = {};

function resizeHardcoded(){
	actionSpot = {
		x: straw.getBoundingClientRect().left,
		y: straw.getBoundingClientRect().top,
		radius: 20
	};
}
resizeHardcoded();
window.addEventListener("resize", resizeHardcoded);


// Start tracking the mouse with as the mouse object
var mouse = new Mouse();
mouse.click = function(e){
	blowOut(e); // Try to blow out the candle
}

// Set up the canvas
var fps = 60;
var canvas = document.getElementById("frame");
var render = new Render(canvas, fps);

// Set the respawning sparkle function
setInterval(function(){
	if(blown){ // If it's blown
		return;
	}
	// Add a sparkle
	render.append([new Boom(actionSpot.x, actionSpot.y, sparkle.size, sparkle.duration, rgbaRandomRed())]); // Append the explosions
}, sparkle.duration);

// Check if it is blown out
function blowOut(e = null){
	// Check if mouse pos is found
	if(e === null){
		return;
	}

	// If it's inside the blowout point
	var deltaX = e.clientX - actionSpot.x;
	var deltaY = e.clientY - actionSpot.y;
	if(Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)) <= actionSpot.radius){
		// Stop the respawning of sparkles
		blown = true;

		// Display the happy bday text
		happyBdayText.innerHTML = "Happy birthday " + bdayName + "!";
		happyBdayText.classList.add("displayCongratz");
	}
}
