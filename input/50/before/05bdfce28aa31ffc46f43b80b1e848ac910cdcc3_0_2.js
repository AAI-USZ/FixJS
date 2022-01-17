function(/* dojox/gfx/Mover */ mover){
			// summary:
			//		called after every move operation
			// mover:
			//		A Mover instance that fired the event.
			connect.publish("/gfx/move/stop", [mover]);
			domClass.remove(win.body(), "dojoMove");
		}