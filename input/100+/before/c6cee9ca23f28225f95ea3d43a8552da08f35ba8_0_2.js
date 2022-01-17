function doRedraw() {
                console.log('rAF');
                // only run this if the mouse is down so we don't constantly loop even 
                // after we're done resizing.
                if (isMouseDown) {
                    // if we've gone below 10 pixels on a mouse move, and the
                    // sidebar is shrinking, hide the sidebar automatically an
                    // unbind the mouse event. 
                    if ((startX > 10) && (newWidth < 10)) {
                        console.log('beginning startX: ' + startX);
                        toggleSidebar(startingSidebarPosition);
                        $mainView.off("mousemove.sidebar");
                        $body.toggleClass("resizing");
                        doResize = false;
                        startX = 0;
                        console.log('ending startX: ' + startX);
                        window.webkitCancelRequestAnimationFrame(this);
                        return;
                        
                    } else if (startX < 10) {
                        // reset startX if we're going from a snapped closed position to open
                        startX = startingSidebarPosition;
                    }
                
                    if (doResize) {
                        // if we've moving past 10 pixels, make the triangle visible again
                        // and register that the sidebar is no longer snapped closed. 
                        var forceTriangle = null;
                    
                        if (newWidth > 10) {
                            forceTriangle = true;
                        }
                        // for right now, displayTriangle is always going to be false for _setWidth
                        // because we want to hide it when we move, and _setWidth only gets called
                        // on mousemove now.
                        _setWidth(newWidth, false, false);
                    }
                
                    if (newWidth === 0) {
                        $mainView.off("mousemove.sidebar");
                        $("body").toggleClass("resizing");
                    }
                    animationRequest = window.webkitRequestAnimationFrame(doRedraw);
                }
            }