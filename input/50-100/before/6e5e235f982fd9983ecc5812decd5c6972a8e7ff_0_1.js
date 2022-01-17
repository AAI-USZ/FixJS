function () {     
        if(a2d.forceClear) {
            a2d.canvas.width = a2d.canvas.width;
        }   
        a2d.requestFrame(a2d.frame);        
        a2d.root.draw();
        a2d.fireEvent("draw");
    }