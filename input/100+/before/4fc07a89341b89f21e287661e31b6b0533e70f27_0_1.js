function onMouseMove(e)
    {
        if(!prop.enabled) return true;
        
        if(!prop.mouseDown)
            return true;
        
        var ctx = prop.uiContex;
        var can = prop.uiCanvas;
        
        var x = e.pageX - can.offsetLeft;
        var y = e.pageY - can.offsetTop;
        
        if(!prop.started)
        {
            ctx.beginPath();
            ctx.moveTo(x, y);
            prop.started = true;
        }
        else
        {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
        
        return false;
    }