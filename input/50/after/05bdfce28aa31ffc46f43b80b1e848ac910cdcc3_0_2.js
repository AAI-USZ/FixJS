function(/* dojox/gfx/Mover */ mover){
			// summary:
			//		called after every move operation
			// mover:
			//		A Mover instance that fired the event.
			topic.publish("/gfx/move/stop", mover);
			domClass.remove(win.body(), "dojoMove");
		}