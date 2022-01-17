function(oldDiv, currDiv, back) {
            oldDiv.style.display = "block";
            currDiv.style.display = "block";
            var that = this;
            if (back) {
                currDiv.style.zIndex = 1;
                oldDiv.style.zIndex = 2;
				
				that.clearAnimations(currDiv);

                that.css3animate(oldDiv, {
                    y: "100%",
                    x: "0%",
                    time: "150ms",
                    callback: function() {
                        that.finishTransition(oldDiv);
                        currDiv.style.zIndex = 2;
                        oldDiv.style.zIndex = 1;
                    }
                });
            } else {
                currDiv.style.zIndex = 2;
                oldDiv.style.zIndex = 1;
                that.css3animate(currDiv, {
                    y: "100%",
                    x: "0%",
                    time: "1ms",
                    callback: function() {
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
                });
            }
        }