function () 
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
        
    }