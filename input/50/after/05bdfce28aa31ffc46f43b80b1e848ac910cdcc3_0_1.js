function(/* dojox/gfx/Mover */ mover){
			// summary:
			//		called before every move operation
			// mover:
			//		A Mover instance that fired the event.
			topic.publish("/gfx/move/start", mover);
			domClass.add(win.body(), "dojoMove");
		}