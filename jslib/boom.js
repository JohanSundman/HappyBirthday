/*
* 	The boom object
*/

// Constructor for the Boom class
function Boom(x = 0, y = 0, size = 20, duration = 200, color = "#B20000"){
	this.x = x;
	this.y = y;
	this.size = size;

	this.duration = duration; // Milliseconds (1000ms = 1s)
	this.color = color;

	this.particleMin = 20;
	this.particleRange = 30;

	// Particle list
	this.particles = [];
	this.createParticles(); // Create a few particles
}

// Update the explosion
Boom.prototype.update = function(ctx){
	this.physics();
	this.render(ctx);
}

// Do all the physics of the explosion
Boom.prototype.physics = function(){
	for(var i = 0; i < this.particles.length; i++){
		this.particles[i].update();
	}
}

// Render the explosion
Boom.prototype.render = function(ctx = null){
	if(ctx === null){
		return false; // Didn't recieve the context
	}

	// Render the explosion!
	for(var i = 0; i < this.particles.length; i++){ // Loop through the particles
		if(!this.particles[i].alive){ // Not alive
			continue;
		}
		ctx.beginPath();
		ctx.rect(this.particles[i].x, this.particles[i].y, this.particles[i].size, this.particles[i].size);
		ctx.fillStyle = this.particles[i].color;
		ctx.fill();
	}
}


Boom.prototype.createParticles = function(){
	var amount = Math.random() * this.particleRange + this.particleMin; // Can be a floating
	for(var i = 0; i < amount; i++){
		var speed = Math.random() * 10 + 5; // 5 - 15
		var angle = Math.round(Math.random() * 360);
		var size = this.size;
		var decaying = 4; // %
		var color = this.color;
		var duration = this.duration; // ms
		var delay = Math.round(Math.random() * 500); // ms
		this.particles.push(new Particle(this.x, this.y, speed, angle, size, decaying, color, duration, delay));
	}
}





/* Particle */
function Particle(x, y, speed = 2, angle = null, size = 10, decaying = 2, color = "#ff0000", duration = 700, delay = 10){
	var self = this; // Capsule
	this.alive = false;
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.angle = degToRad(angle);
	this.size = size;
	this.decaying = (100 - decaying) / 100; // Percentage to decimal
	this.color = color;
	this.duration = duration;
	this.delay = delay;

	// Set it's delayed spawning
	setTimeout(function(){
		self.alive = true; // Will now render
		// Set it's lifespan in action
		setTimeout(function(){
			self.alive = false; // Will not render
		}, self.duration);
	}, self.delay);

	// Get the increments
	this.getIncrements();
}

// Get the incremental values for this angle
Particle.prototype.getIncrements = function(){
	this.xInc = this.speed * Math.cos(this.angle);
	this.yInc = this.speed * Math.sin(this.angle);
}

// Update the state
Particle.prototype.update = function(){
	if(!this.alive){ // Not alive
		return false;
	}
	this.x += this.xInc;
	this.y += this.yInc;
	this.size *= this.decaying; // Make it smaller
}