function() {
                        if (!hovered) {
                            // hide by fading out
                            container.animate( { opacity : 0 }, {
                                duration: 200,
                                complete: function() {
                                    container.css("opacity", "");
                                    container.hide();
                                }
                            });
                            
                        }
                    }