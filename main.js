var gameInterval;
var gameCanvas;
var eventCatcherDiv;


var cursorX = 10;
var cursorY = 10;

// Lists of things to draw
var blobs;
var arrows;
    
function drawTheblob(g,i)
{
	var blob = blobs[i];
	var img        = document.getElementById("dot");
	g.drawImage(img, blob[0], blob[1]);	
}

function drawTheArrow(g,i)
{
	var arrow = arrows[i];
	var x,y,rx,ry;
	var sine,cosine;
	
	// Get the Sine and Cosine values that are stored inthe arrow
	sine = arrow[2];
	cosine = arrow[3];

	g.beginPath();
	g.lineWidth = 3;
	g.strokeStyle = "#FFFFFF"; // Draw white lines
	
    // The arrow is three lines 
	//
	// from (-20,0) to (+20, 0)
	// from (10,10) to (20,0)
	// from (20,0) to (10,-10)
	// The last two lines can be drawn with one stroke of the brush
	//
	// These points need to be rotated using the sine & cosine values 
	// to point the arrow in the correct directions. 
	
	////////////////////////////////////
	// And this actually draws the lines
	// on the canvas
	////////////////////////////////////
	//muzzle of the cannon
	g.strokeStyle = "#000000"; // Draw black lines
	x = +20; y = -5;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine;
	g.moveTo(arrow[0]+rx, arrow[1]+ry);	
	x = 20; y = 5;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine;
	g.lineTo(arrow[0]+rx, arrow[1]+ry);	
	x = 15; y = 5;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine
	g.lineTo(arrow[0]+rx, arrow[1]+ry);	
	x = 15; y = -5;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine;;
	g.lineTo(arrow[0]+rx, arrow[1]+ry);
	g.closePath();
	g.fill();
	
	//body of cannon
	
	g.beginPath();
	x = 15; y = -3;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine;
	g.moveTo(arrow[0]+rx, arrow[1]+ry);	
	x = -15; y = -7;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine;
	g.lineTo(arrow[0]+rx, arrow[1]+ry);	
	x = -20; y = 0;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine
	g.lineTo(arrow[0]+rx, arrow[1]+ry);	
	x = -15; y = 7;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine;;
	g.lineTo(arrow[0]+rx, arrow[1]+ry);
	x = +15; y = 3;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine;
	g.lineTo(arrow[0]+rx, arrow[1]+ry);	
	g.stroke();
	
	//left wheel of cannon
	
	g.beginPath();
	x = +13; y = -7;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine;
	g.moveTo(arrow[0]+rx, arrow[1]+ry);	
	x = -13; y = -11;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine;
	g.lineTo(arrow[0]+rx, arrow[1]+ry);	
	x = -13; y = -13;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine
	g.lineTo(arrow[0]+rx, arrow[1]+ry);	
	x = 13; y = -9;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine;;
	g.lineTo(arrow[0]+rx, arrow[1]+ry);
	g.closePath();
	g.stroke();
	// right wheel of cannon
	g.beginPath();
	x = -13; y = 7;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine;
	g.moveTo(arrow[0]+rx, arrow[1]+ry);	
	x = 13; y = 11;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine;
	g.lineTo(arrow[0]+rx, arrow[1]+ry);	
	x = 13; y = 13;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine
	g.lineTo(arrow[0]+rx, arrow[1]+ry);	
	x = -13; y = 9;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine;;
	g.lineTo(arrow[0]+rx, arrow[1]+ry);
	g.closePath();
	g.stroke();
}


function startLoading()
{
	eventCatcherDiv = document.getElementById("EventCatcher");
	// Whenever the mouse moves call the "canvasMove" function
	eventCatcherDiv.addEventListener("mousemove", canvasMove);
	
	// Find out which area of the HTML page we are drawing in
	gameCanvas = document.getElementById("GraphicsBox");
	
	// Wait 250ms for the page to finish loading
	gameInterval = setInterval(hasLoaded, 250);
}

function hasLoaded()
{
	// This should test that all the graphics have loaded. 
	// At the moment it doesn't
	if (true) // Check to see if all info is loaded
	{
		clearInterval(gameInterval);
		startGame();
	}
}

function startGame()
{
	// Create 10 object to be drawn on the screen. at random positions moving in random directions
	
	blobs = [];
	for(i = 0; i < 10; i++) {
	    blobs[i] = [ Math.floor(Math.random() *580),Math.floor(Math.random() *380), Math.floor(Math.random() *2)*2-1, Math.floor(Math.random() *2)*2-1];
    }
	
	// Now create 24 arrows, evenly spaced over the screen
	// These will all point at the mouse cursor once a 
	// 'mousemove' event has been seen.
	arrows = [];
							// X    Y   Sin  Cos
	arrows[arrows.length]  = [ 50, 50,0.707,0.707];
	arrows[arrows.length]  = [150, 50,0.707,0.707];
	arrows[arrows.length]  = [250, 50,0.707,0.707];
	arrows[arrows.length]  = [350, 50,0.707,0.707];
	arrows[arrows.length]  = [450, 50,0.707,0.707];
	arrows[arrows.length]  = [550, 50,0.707,0.707];

	arrows[arrows.length]  = [ 50,150,0.707,0.707];
	arrows[arrows.length]  = [150,150,0.707,0.707];
	arrows[arrows.length]  = [250,150,0.707,0.707];
	arrows[arrows.length]  = [350,150,0.707,0.707];
	arrows[arrows.length]  = [450,150,0.707,0.707];
	arrows[arrows.length]  = [550,150,0.707,0.707];

	arrows[arrows.length]  = [ 50,250,0.707,0.707];
	arrows[arrows.length]  = [150,250,0.707,0.707];
	arrows[arrows.length]  = [250,250,0.707,0.707];
	arrows[arrows.length]  = [350,250,0.707,0.707];
	arrows[arrows.length]  = [450,250,0.707,0.707];
	arrows[arrows.length]  = [550,250,0.707,0.707];

	arrows[arrows.length]  = [ 50,350,0.707,0.707];
	arrows[arrows.length]  = [150,350,0.707,0.707];
	arrows[arrows.length]  = [250,350,0.707,0.707];
	arrows[arrows.length]  = [350,350,0.707,0.707];
	arrows[arrows.length]  = [450,350,0.707,0.707];
	arrows[arrows.length]  = [550,350,0.707,0.707];

	// Set a timer, which will call "runGame()" 40 times a second (every 25ms)
	gameInterval = setInterval(runGame, 25);
}

function canvasMove(E)
{
	var angle;
	var i;
	// What to do when the mouse moves
	E = E || window.event;

	////////////////////////////////////////////////
    // Add a new blob at the current cursor location
	////////////////////////////////////////////////
    
	// Choose a random angle for it to move
	angle = Math.random() * 2 * 3.141592;
	
	// Set the top left corner to be a 'up' and 'left' of the mouse cursor location
	blobs[blobs.length] = [E.pageX-11, E.pageY-11, Math.sin(angle), Math.cos(angle)];

	// If we have too many blobs, remove the first one
	if(blobs.length > 50)
		blobs.shift();
	
	////////////////////////////////////////////////
	// Update the direction of the arrows
	////////////////////////////////////////////////
	for(i = 0; i < arrows.length; i++) {
		var dx,dy;
		var arrow = arrows[i];
		
		// Work out the distance in X and Y to between the arrow and mouse pointer
		dx = E.pageX - arrow[0];
		dy = E.pageY - arrow[1];
		
		// Check to ensure that the math is going to work... (avoid divide by zero)
		if(dx != 0 || dy != 0) {
			var length;
			//Scale the distances by the length, giving a consistent  sin() and cos() to store in arrow[2] and arrow[3]
			length = Math.sqrt(dx*dx+dy*dy);
			arrow[2] = dy / length;
			arrow[3] = dx / length;
		}
	}
}

function updateBlobPosition(i) 
{
	//////////////////////////////////////////
	// Move the active objects (in this case 
	// blob 'i') around on the screen
	///////////////////////////////////////////
	
	// Change the X position, and maybe bounce
	if(blobs[i][2] >= 1) {
	   blobs[i][0] = blobs[i][0]+blobs[i][2];
	   if(blobs[i][0] > 585)
		 blobs[i][2] *= -1;
	} else {
	   blobs[i][0] = blobs[i][0]+blobs[i][2];
	   if(blobs[i][0] < 0)
		 blobs[i][2] *= -1;	   
	}

	// Change the Y position, and maybe bounce
	if(blobs[i][3] >= 0) {
	   blobs[i][1] = blobs[i][1]+blobs[i][3];
	   if(blobs[i][1] > 385) {
		 blobs[i][3] *= -1;
	   }
	} else {
	   blobs[i][1] = blobs[i][1]+blobs[i][3];
	   if(blobs[i][1] < 0)
		 blobs[i][3] *= -1;	   
	}
}
function seeIfWallHit(i) {
	////////////////////////////////////////////
	// Test to see if the 15x15 blob is close to 
	// the 20x20 block in the middle of the screen
	///////////////////////////////////////////////
	if(blobs[i][0] >= 275 && blobs[i][0] < 310) {
		if(blobs[i][1] >= 175 && blobs[i][1] < 210) {
			blobs.splice(i, 1);
		}
	}
}

function runGame()
{
	///////////////////////////////////////////////////
	// This is called every 25ms to update the display
	///////////////////////////////////////////////////
	var ctx;
	var img;
	var i;

	img        = document.getElementById("backdrop");
	
	// Update the position of every blog
	for(i = 0; i < blobs.length; i++) {
  	    updateBlobPosition(i);
	}

	// Check to see if the blobs have hit a wall
	for(i = 0; i < blobs.length; i++) {
  	    seeIfWallHit(i);
	}

	//////////////////////////////////////////////
	// Now to draw everything!
	//////////////////////////////////////////////
//	gameCanvas.getContext("2d").clearRect(0, 0, gameCanvas.width, gameCanvas.height);

	// Draw the background image
	ctx = gameCanvas.getContext("2d");
    ctx.drawImage(img, 0, 0, 600, 400);	

	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(290, 190, 20, 20);

	// Draw all the blobs
	for(i = 0; i < blobs.length; i++) {
 	    drawTheblob(ctx,i);
	}
	
	// Draw each of the arrows
	for(i = 0; i < arrows.length; i++) {
 	    drawTheArrow(ctx,i);
	}

	
}