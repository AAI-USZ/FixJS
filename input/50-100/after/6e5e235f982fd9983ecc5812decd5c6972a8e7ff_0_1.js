function () {     
        if(a2d.forceClear && a2d.context) {
            a2d.context.clearRect(0, 0, a2d.dimension.Width, a2d.dimension.Height);
            //a2d.canvas.width = a2d.canvas.width;
        }   
        a2d.requestFrame(a2d.frame);        
        //window.webkitRequestAnimationFrame(a2d.frame);
        a2d.root.draw();
        a2d.fireEvent("draw");
    }