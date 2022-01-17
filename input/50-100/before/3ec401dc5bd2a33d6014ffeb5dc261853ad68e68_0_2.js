function() { 
                        if (hovered) {
                            // attach to DOM
                            if (!attached) {
                                $("body").append(container);
                                attached = true;
                            }
                            
                            // position tooltip
                            var positions = position();
                            
                            // show
                            animate(container, props.animateShow, positions.position);
                        }
                        
                    }