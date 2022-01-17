function() {
                        that.css3animate(oldDiv, {
                            x: "-100%",
                            y: 0,
                            callback: function() {
                                that.finishTransition(oldDiv);
                            
                            }
                        });
                        currDiv.style.zIndex = 2;
                        oldDiv.style.zIndex = 1;
                    }