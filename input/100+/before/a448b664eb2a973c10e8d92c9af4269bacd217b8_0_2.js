function Paint(pCanvas)
{
    var self = this;
    var prop = {};
    
    prop.uiCanvas = undefined;
    prop.uiContex = undefined;
    
    
    //MouseButton is pressed draw at mouse move
    prop.mouseDown = false;
    prop.started = false;
    //Stroke counter for validation
    prop.strokeCount = 0;
    //drawing is allowed
    prop.enabled = true;
    
    //color
    
    //stroke weight
    //TODO change color with each stroke?
    
    /**
     * Ctor
     */
    (function () 
    {   
        //prepare canvas
        prop.uiCanvas = pCanvas;
        prop.uiContex = pCanvas.getContext('2d');
        
        prop.uiContex.lineWidth = 5;
        
        //mousedown and mouseup
        
        //register mouse move paint
        prop.uiCanvas.onmousemove = onMouseMove;
        prop.uiCanvas.onmousedown = onMouseDown;
        prop.uiCanvas.onmouseup = onMouseUp;
        
        //TODO lost Focus same as mouseUp
        
    })();
    
    /**
    * Clear Canvas
    */
    self.clear = function()
    {
        var ctx = prop.uiContex;
        var w = prop.uiCanvas.width;
        var h = prop.uiCanvas.height;
        ctx.clearRect(0, 0, w, h);
        
        prop.strokeCount = 0;
    }
    
    self.disable = function() { prop.enabled = false; }
    self.enable = function() { prop.enabled = true; }
    
    //TODO get stroke count
    //TODO enable/disable drawings
    
    function onMouseDown(e)
    {
        if(!prop.enabled) return true;
        
        prop.mouseDown = true;
    }
    
    function onMouseUp(e)
    {
        if(!prop.enabled) return true;
        
        prop.strokeCount++;
        prop.mouseDown = false;
        prop.started = false;
        prop.uiContex.endPath();
    }
    
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
    
    
}