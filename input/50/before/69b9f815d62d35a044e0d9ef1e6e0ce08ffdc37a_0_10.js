function() {
                        that.css3animate(oldDiv, {
                            x: "-100%",
                            y: 0,
                            time: "1ms",
		                    scale: 1,
		                    rotateY: "0deg",
                            callback: function() {
                                that.finishTransition(oldDiv);
                            }
                        });
                    }