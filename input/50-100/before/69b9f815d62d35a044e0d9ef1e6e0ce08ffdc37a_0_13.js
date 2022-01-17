function() {
		                that.css3animate(currDiv, {
		                    x: "0%",
		                    time: "150ms",
		                    opacity: 1,
							callback:function(){
								that.clearAnimations(currDiv);
		                        that.css3animate(oldDiv, {
		                            x: "-100%",
		                            y: 0,
		                            callback: function() {
		                                that.finishTransition(oldDiv);
		                            }
		                        });
							}
		                });
                    }