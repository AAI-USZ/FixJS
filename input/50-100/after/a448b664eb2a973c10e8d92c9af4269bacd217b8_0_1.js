function () 
    {   
        //prepare canvas
        prop.uiCanvas = pCanvas;
        prop.uiContext = pCanvas.getContext('2d');
        
        prop.uiContext.lineWidth = 5;
        
        //mousedown and mouseup
        
        //register mouse move paint
        prop.uiCanvas.onmousemove = onMouseMove;
        prop.uiCanvas.onmousedown = onMouseDown;
        prop.uiCanvas.onmouseup = onMouseUp;
        
        //TODO lost Focus same as mouseUp
        
    }