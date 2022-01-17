function down (event) {
            cursorElmnt.show();
            cursorElmnt.removeClass('off');
            var curpos = cursorElmnt.position();
            mouseStartDelta = { x: event.clientX - curpos.left, y: event.clientY - curpos.top };
            cursorElmnt.css( { 
                    left: event.clientX - mouseStartDelta.x + 'px', 
                    top: event.clientY - mouseStartDelta.y + 'px' 
                } );
        }