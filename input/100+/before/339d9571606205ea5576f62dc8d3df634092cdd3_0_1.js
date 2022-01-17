function(canvas){
		var that = this;
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.hasStarted = false;
		this.shapeCollection = ["sketch","rect"];
		//set defaults
		this.strokeStyle = "000000";
		this.shape = "random";
		/*this.context.strokeStyle = 'red';
		this.context.lineWidth = 10;*/
		function canvasCoord(event){
			 if (event.clientX || event.clientX == 0) { 
			    event._x = event.clientX;
			    event._y = event.clientY;
			  } else if (event.offsetX || event.offsetX == 0) { 
			    event._x = event.offsetX;
			    event._y = event.offsetY;
			  }
		}
	    this.canvas.addEventListener("mousedown",
	        function(e){
	            canvasCoord(e);
	            console.log(this.style)
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