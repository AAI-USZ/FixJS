function() {
                        that.css3animate(currDiv, {
                            y: "0%",
                            x: "0%",
                            time: "150ms",
							callback: function() {
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