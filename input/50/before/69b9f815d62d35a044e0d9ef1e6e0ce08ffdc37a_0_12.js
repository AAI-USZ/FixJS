function() {
                        that.css3animate(currDiv, {
                            x: "0%",
                            time: "150ms",
		                    scale: 1,
		                    rotateY: "0deg",
							callback:function(){
								that.clearAnimations(currDiv);
							}
                        });
                    }