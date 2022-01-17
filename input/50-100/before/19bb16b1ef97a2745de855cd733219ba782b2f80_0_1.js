function down (event) {
            cursorElmnt.show();
            cursorElmnt.removeClass('off');
            var curpos = cursorElmnt.position();
            mouseStartDelta = { x: event.clientX - curpos.left, y: event.clientY - curpos.top };
        }