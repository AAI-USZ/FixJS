function(canceled) {
						if(canceled) {
							that.finishTransition(oldDiv, currDiv);
							return;
						}
						
                        that.css3animate(oldDiv, {
                            x: "-100%",
                            opacity: 1,
                            complete: function() {
                                that.finishTransition(oldDiv);
                            }
                        
                        });
                        currDiv.style.zIndex = 2;
                        oldDiv.style.zIndex = 1;
                    }