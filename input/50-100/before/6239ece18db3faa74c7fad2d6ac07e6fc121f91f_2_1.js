function getMouseBounds(ev){
        if(!ev){ ev = pv.event; }
        
        var offset = $canvas.offset();
        return {
            left:   ev.pageX - offset.left,
            top:    ev.pageY - offset.top,
            width:  10,
            height: 10
        };
    }