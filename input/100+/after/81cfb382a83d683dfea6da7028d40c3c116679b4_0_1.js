function(canvas){
		var that = this;
		this.canvas = canvas;
		if(canvas.nextElementSibling){
			this.canvas_copy = canvas.nextElementSibling;
		}
		this.width = canvas.width;
		this.height = canvas.height;
		this.context = canvas.getContext('2d');
		this.context_copy = this.canvas_copy.getContext('2d');
		this.hasStarted = false;
		this.shapeCollection = ["sketch","rect"];
		//set defaults
		this.strokeStyle = "000000";
		this.shape = "sketch";
		/*this.context.strokeStyle = 'red';
		this.context.lineWidth = 10;*/
		function canvasCoord(event){
			 if (event.layerX || event.layerX == 0) { // Firefox
			    event._x = event.layerX;
			    event._y = event.layerY;
			  } else if (event.offsetX || event.offsetX == 0) { // Opera
			    event._x = event.offsetX;
			    event._y = event.offsetY;
			  }
		}
	    this.canvas.addEventListener("mousedown",
	        function(e){
	            canvasCoord(e);
	            that.mouseDown(e,that)
         });
	    this.canvas.addEventListener("mousemove",
	        function(e){
				canvasCoord(e);
	            that.mouseMove(e,that)
           });
	    this.canvas.addEventListener("mouseup",
	        function(e){
            	that.mouseUp(e,that)
           });
	}