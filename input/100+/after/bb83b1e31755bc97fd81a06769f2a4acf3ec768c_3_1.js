function move (event) {
            console.log('move')
            var x, y, target;
            if (mouseStartDelta) {
                cursorElmnt.css( { 
                    left: event.clientX - mouseStartDelta.x + 'px', 
                    top: event.clientY - mouseStartDelta.y + 'px' 
                } );
                // Hide the cursor before getting elementFromPoint, so we don't get the cursor itself.
                cursorElmnt.toggle();
                if ( ( target = document.elementFromPoint(event.clientX - mouseStartDelta.x + container.offset().left, 
                        event.clientY - mouseStartDelta.y) ) ) {
                    cursorElmnt.toggle();   
                    $(target).addClass('focused');
                    if (currentCursorTarget && currentCursorTarget != target) {
                        $(currentCursorTarget).removeClass('focused');
                        
                    }
                    currentCursorTarget = target;
                } else {
                    cursorElmnt.toggle();   
                }
            }
        }