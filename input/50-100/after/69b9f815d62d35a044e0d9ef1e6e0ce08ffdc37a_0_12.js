function(canceled){
								if(canceled) {
									that.finishTransition(oldDiv, currDiv);
									return;
								}
								
								that.clearAnimations(currDiv);
		                        that.css3animate(oldDiv, {
		                            x: "-100%",
		                            y: 0,
		                            complete: function() {
		                                that.finishTransition(oldDiv);
		                            }
		                        });
							}