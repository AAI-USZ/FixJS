function rembox( e ) {
                        if(hovering( infobox, e.pageX, e.pageY, true ))
                            return;
                        infobox.remove();
                    }