function onMouseUp(e)
    {
        if(!prop.enabled) return true;
        
        prop.strokeCount++;
        prop.mouseDown = false;
        prop.started = false;
        prop.uiContex.endPath();
    }