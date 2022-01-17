function() {
                        if (!hovered) {
                            // hide by fading out
                            container.stop(true, true).animate( { opacity : 0 }, {
                                duration: 200,
                                complete: function() {
                                    container.css("opacity", "");
                                    container.hide();
                                    hidden = true;
                                }
                            });
                        }
                    }