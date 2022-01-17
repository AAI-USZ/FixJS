function(){
		                that.css3animate(oldDiv, {
		                    x: "-100%",
		                    time: "150ms",
		                    callback: function() {
		                        that.finishTransition(oldDiv);
		                    }
		                }).link(currDiv, {
	                        x: "0%",
	                        time: "150ms",
	                        callback: function() {
								that.clearAnimations(currDiv);
	                        }
	                    });
					}