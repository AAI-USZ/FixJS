function() {
                        that.css3animate(oldDiv, {
                            x: "-100%",
                            opacity: 1,
                            callback: function() {
                                that.finishTransition(oldDiv);
                            }
                        
                        });
                        currDiv.style.zIndex = 2;
                        oldDiv.style.zIndex = 1;
                    }