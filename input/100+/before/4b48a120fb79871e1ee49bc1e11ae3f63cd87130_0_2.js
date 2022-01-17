function (e) {
            var startX = e.clientX,
                newWidth = Math.max(e.clientX, 0),
                doResize = true;
            
            isMouseDown = true;
            
            // take away the shadows (for performance reasons during sidebarmovement)
            $sidebar.find(".scroller-shadow").css("display", "none");
            
            $body.toggleClass("resizing");
            
            // check to see if we're currently in hidden mode
            if (isSidebarClosed) {
                toggleSidebar(1);
            }            
                        
            
            animationRequest = window.webkitRequestAnimationFrame(function doRedraw() {
                // only run this if the mouse is down so we don't constantly loop even 
                // after we're done resizing.
                if (isMouseDown) {
                    // if we've gone below 10 pixels on a mouse move, and the
                    // sidebar is shrinking, hide the sidebar automatically an
                    // unbind the mouse event. 
                    if ((startX > 10) && (newWidth < 10)) {
                        toggleSidebar(startingSidebarPosition);
                        $mainView.off("mousemove.sidebar");
                        
                        // turn off the mouseup event so that it doesn't fire twice and retoggle the 
                        // resizing class
                        $mainView.off("mouseup.sidebar");
                        $body.toggleClass("resizing");
                        doResize = false;
                        startX = 0;
                        
                        // force isMouseDown so that we don't keep calling requestAnimationFrame
                        // this keeps the sidebar from stuttering
                        isMouseDown = false;
                        
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
                        console.log('newWidth === 0');
                        //$mainView.off("mousemove.sidebar");
                        //$("body").toggleClass("resizing");
                    }
                    animationRequest = window.webkitRequestAnimationFrame(doRedraw);
                }
            });
            
            $mainView.on("mousemove.sidebar", function (e) {
                newWidth = Math.max(e.clientX, 0);
                
                e.preventDefault();
            });
                
            $mainView.one("mouseup.sidebar", function (e) {
                isMouseDown = false;
                
                // replace shadows and triangle
                $sidebar.find(".sidebar-selection-triangle").css("display", "block");
                $sidebar.find(".scroller-shadow").css("display", "block");
                
                $projectFilesContainer.triggerHandler("scroll");
                $openFilesContainer.triggerHandler("scroll");
                $mainView.off("mousemove.sidebar");
                $body.toggleClass("resizing");
                startingSidebarPosition = $sidebar.width();
            });
            
            e.preventDefault();
        }