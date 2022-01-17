function(){
			_obj.draw();
			_obj.createPredictedImage();
			// Call any callback functions
			if(typeof fnCallback=="function") fnCallback(_obj);
			_obj.trigger("load");
		}