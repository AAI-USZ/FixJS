function getMouseBounds(ev){
        if(!ev){ ev = pv.event; }
        
        var delta = 5;
        var offset = $canvas.offset();
        return {
            left:   ev.pageX - offset.left - delta,
            top:    ev.pageY - offset.top  - delta,
            width:  10 + 2*delta,
            height: 20
        };
    }