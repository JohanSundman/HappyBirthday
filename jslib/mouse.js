/*
* 	Track the mouse
*/

function Mouse(){
	var self = this; // Escape encapsulation
	this.x = 0;
	this.y = 0;
	window.addEventListener("mousemove", function(e){
		self.update(e);
	});
	window.addEventListener("click", function(e){
		self.click(e);
	})
}

Mouse.prototype.update = function(e){
	this.x = e.clientX;
	this.y = e.clientY;
}

Mouse.prototype.click = function(){
	/* Placeholder */
}