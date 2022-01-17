function(time) {

       
//        if(Ori.input.isDown("DEBUG")) debugBox.toggle();

        // zoom with middle button or wheel      
        if (Ori.input.mouse.b2) {
           var y = Ori.input.mouse.y;
           var pitch = (y - Ori.input.drag.y) * time;
           this.model.getCamera().mouseWheel(0.0, 0.0, -pitch);
           Ori.input.drag.y = y;
        }
        if (Ori.input.mouse.wheel) {
         this.model.getCamera().mouseWheel(0.0, 0.0, Ori.input.mouse.z);
         $("#zoom-slider").slider('value',that.getZ());
         //$("#Z > input").attr("value",Number( this.model.getCamera().getZ() ));
        }

        // rotate with left button
        if (Ori.input.mouse.b1) {
            var x = Ori.input.mouse.x;
            var y = Ori.input.mouse.y;
            var pitch = (y - Ori.input.drag.y) * 0.2 * time;
            var yaw = (x - Ori.input.drag.x) * -0.2 * time;
            this.model.getCamera().mouseY(yaw);
            this.model.getCamera().mouseX(pitch);
            Ori.input.drag.x = x;
            Ori.input.drag.y = y;
        }
        
        // update model, info, labels
        this.model.update(time);
        
        //this.handlePicking(time);

       
        
}