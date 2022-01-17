function() {
                        that.css3animate(currDiv, {
                            x: "0%",
							scale: 1,
                            time: "150ms",
							rotateY: "0deg",
							callback: function(){
								that.clearAnimations(currDiv);
							}
                        });
                    }