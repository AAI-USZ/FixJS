f
	

	if(!canvasObj){

		throw "RB.Scene(canvasObject): You must specify a canvas object";

	}

	

	if(!loopTime){

		loopTime = 24;

	}

	

	this.timeInterval = loopTime;

	var c = canvasObj;

	var d = document;

	this.ctx = c.getContext('2d');

	var objects = [];

	

	//the object that must be moved by arrow keys

	var movableObjectId = null;

	

	//the keys pressed at the present moment

	var leftP = false;

	var rightP = false;

	var topP = false;

	var downP = false;

	

	//controls if mouse is pressed or not

	var mouseIsDown = false;

	

	//the current object being dragged

	var currentObject = null;

	

	var dX=0, dY=0;



	// collidable objects

	var colObjects = [];

	

	var draggableObjects = [];



	// controls if the game loop should run or not

	var isStarted = false;



	// number of images attached to the scene

	var imgNum = 0;



	// number of loaded images which are attached to the scene

	var imgCounter = 0;

	

	var divIdCounter = 0;

	

	this.genID = function(){

		return 'RB_OBJECT' + (divIdCounter++);

	}	

	

	// attaches the object to the scene object

	this.add = function(o) {

		

		//checks if the object exists

		if(!o){

			throw "RB.Scene.add(o): the object you are trying to add to the scene doesn't exist.";

		}

		

		objects.push(o);



		// adds the object on a separate 

		// array if it is set to collision

		if (o.collidable) {

			colObjects.push(o);

		}

		

		// adds the object on a separate 

		// array if it is draggable

		if (o.draggable){

			draggableObjects.push(o);

		}

		

		return o;

	};

	

	//adds a lot of objects at a time by passing an array

	this.addLots = function(oArray){

		var theScene = this;

		for(var i=0; i < oArray.length; i++){

			theScene.add(oArray[i]);

		}

	};

	

	//removes an object from the scene

	this.remove = function(o){

		var uid = o.getId();

		var oLen = objects.length;

		var doLen = draggableObjects.length;

		var coLen = colObjects.length;

		

		for(var i=0; i < oLen; i++){

			if(uid == objects[i].getId()){

				objects.splice(i, 1);

				break;

			}

		}

		

		for(var i=0; i < coLen; i++){

			if(uid == colObjects[i].getId()){

				colObjects.splice(i, 1);

				break;

			}

		}

		

		for(var i=0; i < doLen; i++){

			if(uid == draggableObjects[i].getId()){

				draggableObjects.splice(i, 1);

				break;

			}

		}

	};

	

	//removes a lot of objects at once by passing an array

	this.removeLots = function(oArray){

		var theScene = this;

		for(var i=0; i < oArray.length; i++){

			theScene.remove(oArray[i]);

		}

	};

	

	/*

	 * Removes all objects from the scene

	 * Usually used to show a new screen

	 */

	this.removeAll = function(){

		var oLen = objects.length;

		var doLen = draggableObjects.length;

		var coLen = colObjects.length;



		objects.splice(0, oLen);

		colObjects.splice(0, coLen);

		draggableObjects.splice(0, doLen);

	};

	

	this.zIndex = function(o, index){

		var oLen = objects.length;

		var currIndex = getIdByObject(o);

		var newIndex = currIndex + index;

		

		if(newIndex < 0){

			newIndex = 0;

		}

		if(newIndex >= oLen){

			newIndex = oLen-1;

		}

		

		//saves a copy of the object

		var tmp = objects[currIndex];

		objects[currIndex] = objects[newIndex];

		objects[newIndex] = tmp;

	};

	

	//returns an object from the oject array by its id

	getObjectById = function(id){

		var oLen = objects.length;

		for(var i=0; i < oLen; i++){

			if(objects[i].getId() == id){

				return o;

			}

		}

		return null;

	};

	

	//returns an object id from the oject

	getIdByObject = function(ob){

		var oLen = objects.length;

		for(var i=0; i < oLen; i++){

			if(objects[i].getId() == ob.getId()){

				return i;

			}

		}

		return null;

	};

	

	this.setMovableObject = function(p){

		if(typeof p == 'object') {

			movableObjectId = p.getId();

		} else {

			movableObjectId = p;

		}

	};

	

	this.getMovableObject = function(){

		return getObjectById(movableObjectId);

	};

	

	//gets the keys pressed. its used on the movable object

	var getKeyDirection = function(e, b){

		var k = e.keyCode || e.which;

	

		switch(k){

			case 37:

			leftP = b;

			break;

		

			case 38:

			topP = b;

			break;

		

			case 39:

			rightP = b;

			break;

		

			case 40:

			downP = b;

			break;

		}

	};

	

	this.onmousemove = function(e){};

	this.onmousedown = function(e){};

	this.onmouseup = function(e){};

	this.onkeydown = function(e){};

	this.onkeyup = function(e){};

	

	//registers canvas events

	var theScene = this;

	c.onmousemove = function(e){mouseMove(e); theScene.onmousemove(e);};

	c.onmousedown = function(e){mousedown(e); theScene.onmousedown(e);};

	c.onmouseup = function(e){mouseIsDown = false; theScene.onmouseup(e);};

	

	d.onkeydown = function(e){

		getKeyDirection(e, true);

		theScene.onkeydown(e);

	};

	

	d.onkeyup = function(e){

		getKeyDirection(e, false);

		theScene.onkeyup(e);

	};

	

	//event methods

	var mouseMove = function(event) {

		if(mouseIsDown && currentObject) {

			currentObject.x = (RB.xPos(event) - dX);

			currentObject.y = (RB.yPos(event) - dY);

			

			/* if you r trying to drag something

			 * but the scene is being animated, that should be checked first.

			 * so, if the scene is being animated, the animation itself

			 * takes care of the drag effect. otherwise the update method

			 * is called.  

			 */

			if(!isStarted){

				theScene.update();

			}

		}

	};

	

	var mousedown = function(event){

		var doLen = draggableObjects.length-1;



		for(var i=doLen; i >= 0; i--){

			var o = draggableObjects[i];



			if( o.checkRange(RB.xPos(event), RB.yPos(event)) ){

			

				//mouse events for objects go here

				o.onmousedown(event);

			

				currentObject = o;

				currentObjectIndex = i;

				

				dX = RB.xPos(event) - currentObject.x;

				dY = RB.yPos(event) - currentObject.y;

				mouseIsDown = true;

				break;

			}

		}

	};

	

	this.getObjectSize = function() {

		return objects.length;

	};



	this.getObj = function(index) {

		return objects[index];

	};

	

	// draws a rectangle inside a buffer canvas

	this.rect = function(w, h, fillStyle, id, strokeStyle) {

		/*

		var theScene = this;

		id = id || theScene.genID();

		var c = RB.createCanvas(w, h, id);

		var ctx = c.getContext('2d');

		

		if(fillStyle){

			ctx.fillStyle = RB.getFS(fillStyle, ctx, h);

			ctx.fillRect(0, 0, w, h);

		}

		

		if(strokeStyle){

			var lw = strokeStyle.lineWidth || 1;

			ctx.lineWidth = strokeStyle.lineWidth;

			ctx.strokeStyle = strokeStyle.strokeStyle;

			ctx.rect(0+lw, 0+lw, w-lw-lw, h-lw-lw);

			ctx.stroke();

		}

		

		return rectObj = new RB.Obj(c, this.ctx);

		*/

		var c = RB.createCanvas(w, h, id);

		var ctx = c.getContext('2d');

		ctx.fillStyle = RB.getFS(fillStyle, ctx, h);

		ctx.fillRect(0, 0, w, h);

		return c;

	};



	// load an image inside a buffer canvas

	//and return it in a RB.Obj

	this.image = function(url, id) {

		var img = new Image();

		var theScene = this;

		var c = null;

		img.onload = function() {

			c = RB.createCanvas(img.width, img.height, id);

			var ctx = c.getContext('2d');

			ctx.drawImage(this, 0, 0);

			imgCounter++;

			

			imgCounter == imgNum && theScene.doAfterLoad();

		};



		img.src = url;

		imgNum++;

	};



	// load an image inside a buffer canvas

	//and returns the canvas DOM

	this.loadImage = function(url, id, cb) {

		var img = new Image();

		var theScene = this;

		var c = null;

		img.onload = function() {

			id = id || theScene.genID();

			c = RB.createCanvas(img.width, img.height, id);

			var ctx = c.getContext('2d');

			ctx.drawImage(this, 0, 0);

			imgCounter++;

			

			cb(c);

		};

		img.src = url;

		imgNum++;

	};



	// draws a (repeated) pattern inside a buffer canvas

	this.imagePattern = function(url, w, h, patternType, id) {

		var img = new Image();

		var theScene = this;

		img.onload = function() {

			id = id || theScene.genID();

			var c = RB.createCanvas(w, h, id);

			var ctx = c.getContext('2d');

			var fs = ctx.createPattern(img, patternType);

			ctx.fillStyle = fs;

			ctx.fillRect(0, 0, w, h);



			imgCounter++;



			if (imgCounter == imgNum) {

				theScene.doAfterLoad();

			}

		};

		img.src = url;

		imgNum++;

	};



	this.roundRect = function(w, h, arco, fillStyle, id) {

		

		if(!w || !h || !arco || !fillStyle || !id) {

			throw "All parameters must be set: roundRect(w, h, arc, fillStyle, id);";

		}

		

		var c = RB.createCanvas(w, h, id);

		var ctx = c.getContext('2d');

		var x = 0, y = 0;



		ctx.beginPath();

		ctx.moveTo(x + arco, y);

		ctx.lineTo(w + x - arco, y);

		ctx.quadraticCurveTo(w + x, y, w + x, y + arco);

		ctx.lineTo(w + x, h + y - arco);

		ctx.quadraticCurveTo(w + x, y + h, w + x - arco, y + h);

		ctx.lineTo(x + arco, y + h);

		ctx.quadraticCurveTo(x, y + h, x, y + h - arco);

		ctx.lineTo(x, y + arco);

		ctx.quadraticCurveTo(x, y, x + arco, y);

		ctx.closePath();

		ctx.fillStyle = RB.getFS(fillStyle, ctx, h);

		ctx.fill();

		return c;

	};



	// draws a text inside a buffer canvas

	this.text = function(str, fontFamily, fontSize, fillStyle, id) {





        var d = RB.getTextBuffer();

        d.innerHTML = str;

        d.style.fontFamily = fontFamily;

        d.style.fontSize = fontSize + "px";

        var h = RB.el(id);



        h ? (id = h.getContext("2d"), h.width = d.offsetWidth,

        h.height = d.offsetHeight + 15,

        id.clearRect(0, 0, d.offsetWidth, d.offsetHeight + 15)) : 



        (h = RB.createCanvas(d.offsetWidth, d.offsetHeight + 15, id),

        id = h.getContext("2d"));

        id.fillStyle = RB.getFS(fillStyle, id, d.offsetHeight + 25);

        id.font = "normal " + fontSize + "px " + fontFamily;

        id.fillText(str, 0, d.offsetHeight + 5);

        return h;





		/*

		var tb = RB.getTextBuffer();

		//var theScene = this;

		//id = id || theScene.genID();

		

		tb.innerHTML = str;

		tb.style.fontFamily = fontFamily;

		tb.style.fontSize = fontSize + 'px';

		

		//check if that id already exists

		//if so doesnt create a new canvas

		var c = RB.el(id);

		var ctx;

		

		if(!c){

			c = RB.createCanvas(tb.offsetWidth, tb.offsetHeight + 15, id);

			ctx = c.getContext('2d');

		} else {

			//if already existed, clear and rezise the canvas

			ctx = c.getContext('2d');

			

			c.width = tb.offsetWidth;

			c.height = tb.offsetHeight + 15;

			ctx.clearRect(0, 0, tb.offsetWidth, tb.offsetHeight + 15);

		}



		ctx.fillStyle = RB.getFS(fillStyle, ctx, tb.offsetHeight + 25);

		ctx.font = 'normal ' + fontSize + 'px ' + fontFamily;

		ctx.fillText(str, 0, tb.offsetHeight + 5);

		

		var obj = new RB.Obj(c, theScene.ctx);

		

		return obj;

		*/

	};



	this.start = function() {

		isStarted = true;

		this.animate();

	};



	this.stop = function() {

		isStarted = false;

	};



	this.toggleStart = function() {

		isStarted ? this.stop() : this.start();

	};

	

	this.onLoop = function(){};

	

	//this is all the logic when a scene starts running

	//it is separated from animate method so that it can be used in other cases

	this.runOnce = function(){

		this.ctx.restore();

		var objectLen = objects.length;

		var colObjectsLen = colObjects.length;



		for (var i = 0; i < objectLen; i++) {

		//for (var i = objectLen; i >= 0; i--) {

			var otmp = objects[i];



			if(otmp.visible) {

				otmp.run();

			} else {

				continue;

			}

			

			if (otmp.collidable && !otmp.obstacle) {



				for (var j = 0; j < colObjectsLen; j++) {

					var o = colObjects[j];



					// object doesnt check collision with itself,

					// so if object unique ids are the same this part is skipped

					if (otmp.getId() != o.getId()) {

						var colCheck = otmp.checkCollision(o, true);

						o=null;



						if (colCheck.top || colCheck.bottom || colCheck.left || colCheck.right) {

							otmp.colliding = true;

							otmp.collidingCoords = colCheck;



							// object collided in something, so abort the loop

							break;

						} else {

							otmp.colliding = false;

							otmp.collidingCoords = null;

						}

					}

				}

			}

			

			moveOrCollide(otmp);



		}

		this.ctx.save();

	};

	

	var moveOrCollide = function(obj){

		//check if object is movable

		var anyArrowIsPressed = leftP || rightP || downP || topP;

		if(obj.getId() == movableObjectId && anyArrowIsPressed){

		

			//check coordinate collisions

			var lc=false, rc=false, tc=false, dc=false;

			var cc = obj.collidingCoords;

			if(cc){

				lc = cc.left;

				rc = cc.right;

				tc = cc.top;

				dc = cc.bottom;

			}

		

			if(leftP && !lc)obj.left();

			if(rightP && !rc)obj.right();

			if(topP && !tc) obj.up();

			if(downP && !dc) obj.down();

		}

	};



	this.animate = function() {

		this.runOnce();

		

		//global operation that is executed every loop

		this.onLoop();



		if (isStarted) {

			var theScene = this;

			setTimeout(function() {

				theScene.animate();

			}, this.timeInterval);

		}

	};

	

	//update the canvas only once

	//idk if this can cause any trouble if ran at

	//same time as .animate :/

	this.update = function() {

		var objectLen = objects.length;



		for ( var i = 0; i < objectLen; i++) {

			var otmp = objects[i];

			otmp.run();

		}

	};



	// method executed after all images are buffered and loaded

	this.doAfterLoad = function() {

	};

};
