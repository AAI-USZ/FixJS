function() {
                        that.css3animate(currDiv, {
                            x: "0%",
                            time: "150ms",
                            scale: 1,
                            opacity: 1,
                            origin: "0%"+" 0%",
							callback: function(){
								that.clearAnimations(currDiv);
		                        that.css3animate(oldDiv, {
		                            x: "100%",
		                            y: 0,
		                            callback: function() {
		                                that.finishTransition(oldDiv);
		                            }
		                        });
							}
                        });
                    }