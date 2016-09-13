var gameInterval;
var gameCanvas;
var eventCatcherDiv;

var introCountdown = 200;
var currentLevel = 1;
var finishTime = 200;
var cursorX = 10;
var cursorY = 10;
var stopped = 0;
// Lists of things to draw
var blobs;
var arrows;
var selected = -1;   
function drawTheblob(g,i)
{
	var blob = blobs[i];	
	var colour;
	if(blob[5]==-2) colour = "#0000ff"; // Draw black lines
	if(blob[5]==-1) colour = "#8080ff"; // Draw black lines
	if(blob[5]==0) colour = "#c0c0c0";
	if(blob[5]==1) colour = "#ff8080"; // Draw black lines
	if(blob[5]==2) colour = "#ff0000"; // Draw black lines
	g.strokeStyle = colour;
	g.fillStyle = colour;
	g.beginPath();
	g.arc(blob[0],blob[1],7,0,2*Math.PI);
	g.fill();
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
var colour;
	if(arrow[5]==-2) colour = "#0000ff"; // Draw black lines
	if(arrow[5]==-1) colour = "#8080ff"; // Draw black lines
	if(arrow[5]==0) colour = "#c0c0c0"; // Draw black lines
	if(arrow[5]==1) colour = "#ff8080"; // Draw black lines
	if(arrow[5]==2) colour = "#ff0000"; // Draw black lines
g.strokeStyle = colour;
g.fillStyle = colour;
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
	x = 13; y = 7;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine;
	g.moveTo(arrow[0]+rx, arrow[1]+ry);	
	x = -13; y = 11;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine;
	g.lineTo(arrow[0]+rx, arrow[1]+ry);	
	x = -13; y = 13;
	rx = x*cosine - y * sine;
	ry = x*sine   + y * cosine
	g.lineTo(arrow[0]+rx, arrow[1]+ry);	
	x = 13; y = 9;
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
	eventCatcherDiv.addEventListener("mousedown", canvasClick);
	eventCatcherDiv.addEventListener("mouseup", canvasUnClick);
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
function startLevel()
{
	arrows=[];
	blobs=[];
	finishTime=200;
	if (currentLevel>3)
		currentLevel=1;
	//As more added levels change line above
	
	if (currentLevel==3){
		arrows[arrows.length]  = [ 35, 200,0.707,0.707, 20, -2];
		arrows[arrows.length]  = [ 305, 85,0.707,0.707, 40, -1];
		arrows[arrows.length]  = [ 11, 14,0.707,0.707, 13, 0];
		arrows[arrows.length]  = [477, 60,0.707,0.707, 44, 0];
		arrows[arrows.length]  = [430, 111,0.707,0.707, 72, 1];
		arrows[arrows.length]  = [250, 280,0.707,0.707, 64, 2];
		return
	}
	if (currentLevel==2){
		arrows[arrows.length]  = [ 75, 20,0.707,0.707, 20, -2];
		arrows[arrows.length]  = [ 400, 90,0.707,0.707, 40, -1];
		arrows[arrows.length]  = [250, 107,0.707,0.707, 13, 0];
		arrows[arrows.length]  = [550, 370,0.707,0.707, 44, 0];
		arrows[arrows.length]  = [100, 350,0.707,0.707, 72, 1];
		arrows[arrows.length]  = [172, 180,0.707,0.707, 64, 2];
		return
	}
	if (currentLevel==1){
		arrows[arrows.length]  = [ 30, 80,0.707,0.707, 20, -2];
		arrows[arrows.length]  = [ 60, 50,0.707,0.707, 40, -1];
		arrows[arrows.length]  = [100, 300,0.707,0.707, 13, 0];
		arrows[arrows.length]  = [500, 100,0.707,0.707, 44, 0];
		arrows[arrows.length]  = [570, 320,0.707,0.707, 72, 1];
		arrows[arrows.length]  = [540, 350,0.707,0.707, 64, 2];
		return
	}
	

}
function startGame()
{
	// Create 10 object to be drawn on the screen. at random positions moving in random directions
	
	blobs = [];
	//for(i = 0; i < 10; i++) {
	//    blobs[i] = [ Math.floor(Math.random() *580),Math.floor(Math.random() *380), Math.floor(Math.random() *2)*2-1, Math.floor(Math.random() *2)*2-1];
    //}
	
	// Now create 24 arrows, evenly spaced over the screen
	// These will all point at the mouse cursor once a 
	// 'mousemove' event has been seen.
	arrows = [];
							// X    Y   Sin  Cos
    
//	arrows[arrows.length]  = [ 50, 50,0.707,0.707, 20, -2];
//	arrows[arrows.length]  = [150, 50,0.707,0.707, 40, -1];
//	arrows[arrows.length]  = [250, 50,0.707,0.707, 13, 0];
//	arrows[arrows.length]  = [350, 50,0.707,0.707, 44, 0];
//	arrows[arrows.length]  = [450, 50,0.707,0.707, 72, 1];
//	arrows[arrows.length]  = [550, 50,0.707,0.707, 64, 2];

//	arrows[arrows.length]  = [ 50,150,0.707,0.707];
//	arrows[arrows.length]  = [150,150,0.707,0.707];
//	arrows[arrows.length]  = [250,150,0.707,0.707];
//	arrows[arrows.length]  = [350,150,0.707,0.707];
//	arrows[arrows.length]  = [450,150,0.707,0.707];
//	arrows[arrows.length]  = [550,150,0.707,0.707];

//	arrows[arrows.length]  = [ 50,250,0.707,0.707];
//	arrows[arrows.length]  = [150,250,0.707,0.707];
//	arrows[arrows.length]  = [250,250,0.707,0.707];
//	arrows[arrows.length]  = [350,250,0.707,0.707];
//	arrows[arrows.length]  = [450,250,0.707,0.707];
//	arrows[arrows.length]  = [550,250,0.707,0.707];

//	arrows[arrows.length]  = [ 50,350,0.707,0.707];
//	arrows[arrows.length]  = [150,350,0.707,0.707];
//	arrows[arrows.length]  = [250,350,0.707,0.707];
//	arrows[arrows.length]  = [350,350,0.707,0.707];
//	arrows[arrows.length]  = [450,350,0.707,0.707];
//	arrows[arrows.length]  = [550,350,0.707,0.707];

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
	// Update the direction of the arrows
	////////////////////////////////////////////////
	if (selected >=0){
		var dx,dy;
		var arrow = arrows[selected];
		
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

function canvasClick(E)
{
	var angle;
	var i;
	// What to do when the mouse moves
	E = E || window.event;

	for(i = 0; i < arrows.length; i++) {
		var dx,dy;
		var arrow = arrows[i];
		
		// Work out the distance in X and Y to between the arrow and mouse pointer
		dx = E.pageX - arrow[0];
		dy = E.pageY - arrow[1];
		if(dx*dx+dy*dy<20*20) {
			if (arrow[5]<0)
				selected=i;
		}
	}
	if (E.pageX<20 && E.pageY<20){
		if (stopped == 1) {
			stopped = 0
		} else {
			stopped = 1
		}
	}
}
function canvasUnClick(E)
{
	selected=-1;
}

function updateBlobPosition(i) 
{
	//////////////////////////////////////////
	// Move the active objects (in this case 
	// blob 'i') around on the screen
	///////////////////////////////////////////
	
	// Change the X position, and maybe bounce
	if(blobs[i][2] >= 0) {
	   blobs[i][0] = blobs[i][0]+blobs[i][2];
	   if(blobs[i][0] > 592) 
		 blobs[i][2] *= -1;
	} else {
	   blobs[i][0] = blobs[i][0]+blobs[i][2];
	   if(blobs[i][0] < 8)
		 blobs[i][2] *= -1;	   
	}

	// Change the Y position, and maybe bounce
	if(blobs[i][3] >= 0) {
	   blobs[i][1] = blobs[i][1]+blobs[i][3];
	   if(blobs[i][1] > 392) {
		 blobs[i][3] *= -1;
	   }
	} else {
	   blobs[i][1] = blobs[i][1]+blobs[i][3];
	   if(blobs[i][1] < 8)
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
function SeeIfCannonHit(i) {
	////////////////////////////////////////////
	// Test to see if the 15x15 blob is close to 
	// the 20x20 block in the middle of the screen
	///////////////////////////////////////////////
	var b = blobs[i];
	for(i = 0; i < arrows.length; i++) {
		var a = arrows[i];
		var dx = a[0]-b[0];
		var dy = a[1]-b[1];
		var distance = Math.sqrt(dx*dx+dy*dy);
		if (distance< 25){
			if (b[5] <0){
				if (a[5]>-2)
					a[5]=a[5]-1;
			}
			if (b[5] >0){
				if (a[5]<2)
					a[5]=a[5]+1;
			}
			b[5]=0;
		}
	}
	
}
function targetCannon(i)
{
	var arrow = arrows[i];
	var x,y,rx,ry;
	var sine,cosine;
	var target = -1;
	var nearestDistance = 2000000;
	for(j=0; j < arrows.length; j++){
		var dx,dy;
		dx=arrows[j][0] - arrow[0];
		dy=arrows[j][1] - arrow[1];
		if (dx*dx+dy*dy<nearestDistance){
			if (j != i){
				if(arrows[j][5]<2){
					target = j;
					nearestDistance=dx*dx+dy*dy
				}
			}
		}
		
	}
	if(i != target) {
		arrow[3]=arrows[target][0] - arrow[0];
		arrow[2]=arrows[target][1] - arrow[1];
		distance = Math.sqrt(arrow[2]*arrow[2] + arrow[3]*arrow[3])
		if(distance>0) {
			arrow[2] /= distance;
			arrow[3] /= distance;
		}
	}
}
function redPlayer(){
	var closestDistance;
	var closest;
	for(i = 0; i < arrows.length; i++) {
		if (arrows[i][5]>0){
			targetCannon(i);	
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
	var img2;
	img2		= document.getElementById("pause");
	img        	= document.getElementById("backdrop");
	if(introCountdown < 1){
		redPlayer();
		// Update the position of every blob
		if (stopped == 0){
			for(i = 0; i < blobs.length; i++) {
				updateBlobPosition(i);
			}

			// Check to see if the blobs have hit a wall
			for(i = 0; i < blobs.length; i++) {
				seeIfWallHit(i);
			}
	
			for(i = 0; i < blobs.length; i++) {
				SeeIfCannonHit(i);
			}
		}
////////////////////////////////////////////////////////
	// See if each of the arrow will fire
		if (stopped == 0){
			for(i = 0; i < arrows.length; i++) {
				var a = arrows[i];
				
				// See if the cannon is ready to fire
				if(a[4] == 0){		
					blobs[blobs.length] = [a[0]+a[3]*26, a[1]+a[2]*26, a[3]*3, a[2]*3, 0, a[5]];
					a[4]=200;
				}  else{
					arrows[i][4] = arrows[i][4]-1;
				}
			
		
			}
		}
	}
	// If we have too many blobs, remove the first one
	if(blobs.length > 50)
		blobs.shift();
	
	//////////////////////////////////////////////
	// Now to draw everything!
	//////////////////////////////////////////////
//	gameCanvas.getContext("2d").clearRect(0, 0, gameCanvas.width, gameCanvas.height);

	// Draw the background image
	ctx = gameCanvas.getContext("2d");
    ctx.drawImage(img, 0, 0, 600, 400);	
	
	ctx.fillStyle = "#000000";
	ctx.fillRect(290, 190, 20, 20);
	
	//get rid of grey blobs
	for(i = 0; i < blobs.length; i++) {
	    if(blobs[i][5]==0)
			blobs.splice(i,1);
	}
	
	// Draw all the blobs
	for(i = 0; i < blobs.length; i++) {
 	    drawTheblob(ctx,i);
	}
	var team1;
	team1 = 0;
	var team2;
	team2 = 0;
	// Draw each of the arrows
	for(i = 0; i < arrows.length; i++) {
 	    drawTheArrow(ctx,i);
		if (arrows[i][5]<0)
			team1 = team1 +1;
		if (arrows[i][5]>0)
			team2 = team2 +1;
	}
	if (team1 == 0 && team2>0){
		ctx.font = "30px Arial";
		ctx.fillStyle = "#ffffff";
		ctx.textAlign = "center";
		ctx.fillText("team red wins!",300, 200);
		finishTime--;
		if (finishTime==0){
			introCountdown=200;
			// reseting current level
		}
	}
	if (team2 == 0 && team1>0){
		ctx.font = "30px Arial";
		ctx.fillStyle = "#ffffff";
		ctx.textAlign = "center";
		ctx.fillText("team blue wins!",300, 200);
		finishTime--;
		if(finishTime==0){
			introCountdown=200;
			currentLevel++;
		}
	}
	if (introCountdown>0){
		introCountdown--;
		ctx.font = "30px Arial";
		ctx.fillStyle = "#ffffff";
		ctx.textAlign = "center";
		if(introCountdown>160)
			ctx.fillText("5",300, 200);
		else if(introCountdown>120)
			ctx.fillText("4",300, 200);
		else if(introCountdown>80)
			ctx.fillText("3",300, 200);
		else if(introCountdown>40)
			ctx.fillText("2",300, 200);
		else if(introCountdown>0)
			ctx.fillText("1",300, 200);
	}
	if (introCountdown == 150)
		startLevel();
	
	ctx.drawImage(img2, 0, 0, 20, 20);	
}