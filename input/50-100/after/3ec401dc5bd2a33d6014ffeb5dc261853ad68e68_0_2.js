function() { 
                        if (hovered) {
                            // attach to DOM
                            if (!attached) {
                                $("body").append(container);
                                attached = true;
                            }
                            
                            // stop any current animations
                            container.stop(true, true);
                            
                            // show if hidden
                            if (hidden) {
                                // position tooltip
                                var positions = position();
                                // show
                                animate(container, props.animateShow, positions.position);
                            }
                        }
                        
                    }