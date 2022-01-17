function(){
								that.clearAnimations(currDiv);
		                        that.css3animate(oldDiv, {
		                            x: "100%",
		                            y: 0,
		                            callback: function() {
		                                that.finishTransition(oldDiv);
		                            }
		                        });
							}