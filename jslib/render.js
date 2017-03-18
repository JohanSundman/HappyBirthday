// Constructor for the Render class
function Render(target, fps){
	var self = this; // Capsule
	this.target = target; // The target canvas
	this.ctx = target.getContext("2d"); // Get the canvas 2d context
	
	// Data
	this.list = []; // 2D array

	// Create the croping
	window.addEventListener("resize", function(){
		self.crop(window.innerWidth, window.innerHeight);
	});

	// Crop the window before rendering
	this.crop(window.innerWidth, window.innerHeight);

	// Create the main loop
	this.start();
}

// Start/stop the main loop
Render.prototype.start = function(){
	var self = this; // Overcome the encapsulation
	this.loop = setInterval(function(){
		self.eventLoop();
	}, 1000 / fps);
}
Render.prototype.stop = function(){
	clearInterval(this.loop);
}

// Append data
Render.prototype.append = function(data){
	this.list.push(data);
}

// Crop the target
Render.prototype.crop = function(w, h){
	this.target.width = w;
	this.target.height = h;
}

// The game loop
Render.prototype.eventLoop = function(){
	// Clear the canvas
	this.ctx.clearRect(0, 0, this.target.width, this.target.height);

	for(var l = 0; l < this.list.length; l++){ // Loop the list
		for(var d = 0; d < this.list[l].length; d++){ // Loop the data
			this.list[l][d].update(this.ctx); // Update the explosion
		}
	}
}