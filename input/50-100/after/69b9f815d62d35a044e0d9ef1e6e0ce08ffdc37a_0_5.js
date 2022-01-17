function(){
		                that.css3animate(oldDiv, {
		                    x: "-100%",
		                    time: "150ms",
		                    complete: function() {
		                        that.finishTransition(oldDiv, currDiv);
		                    }
		                }).link(currDiv, {
	                        x: "0%",
	                        time: "150ms"
	                    });
					}