function(/*String||DOMNode||Function*/ node, /*Integer, optional*/ delay, /*Integer, optional*/ duration, /*Number, optional*/ offsetX, /*Number, optional*/ offsetY){
		// summary:
		//		Moves the mouse over the specified node at the specified relative x,y offset.
		// description:
		//		Moves the mouse over the specified node at the specified relative x,y offset.
		//		If you do not specify an offset, mouseMove will default to move to the middle of the node.
		//		Example: to move the mouse over a ComboBox's down arrow node, call doh.mouseMoveAt(dijit.byId('setvaluetest').downArrowNode);
		// node:
		//		The id of the node, or the node itself, to move the mouse to.
		//		If you pass an id or a function that returns a node, the node will not be evaluated until the movement executes.
		//		This is useful if you need to move the mouse to an node that is not yet present.
		// delay:
		//		Delay, in milliseconds, to wait before firing.
		//		The delay is a delta with respect to the previous automation call.
		//		For example, the following code ends after 600ms:
		// |	robot.mouseClick({left:true}, 100) // first call; wait 100ms
		// |	robot.typeKeys("dij", 500) // 500ms AFTER previous call; 600ms in all
		// duration:
		//		Approximate time Robot will spend moving the mouse
		//		The default is 100ms.
		// offsetX:
		//		x offset relative to the node, in pixels, to move the mouse. The default is half the node's width.
		// offsetY:
		//		y offset relative to the node, in pixels, to move the mouse. The default is half the node's height.

		robot._assertRobot();
		duration = duration||100;
		this.sequence(function(){
			node=robot._resolveNode(node);
			robot._scrollIntoView(node);
			var pos = robot._position(node);
			if(offsetY === undefined){
				offsetX = pos.w/2;
				offsetY = pos.h/2;
			}
			var x = pos.x+offsetX;
			var y = pos.y+offsetY;
			robot._mouseMove(x, y, false, duration);
		}, delay, duration);
	}