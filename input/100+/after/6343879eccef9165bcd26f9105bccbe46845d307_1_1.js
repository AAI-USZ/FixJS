function(params) {

    this.scene = SceneJS.scene({ canvasId: "glCanvas" });
    this.renderer = SceneJS.renderer({  id: "renderer" , clear: { depth : true, color : true },  clearColor: { r: 0.2, g : 0.2, b : 0.2 }, pointSize: 4 });
    this.lookAt = SceneJS.lookAt({ eye : { x: 0.0, y: 0.0, z: -30 }, look : { x:0.0, y:0.0, z: -24 }, up: { x:0.0, y: 1.0, z: 0.0 } });
    this.camera = new Camera();

    this.lookAt.addNode(this.camera);
    this.renderer.addNode(this.lookAt);
    this.scene.addNode(this.renderer);

    // initial start rotation
    this.lookAt.rotateY(Math.PI+0.1);

    this.resize = function() {
        canvas = document.getElementById("glCanvas");
        canvas.width = $(window).width();
        canvas.height = $(window).height();
        model.camera.setOptics({ type: "perspective", fov : 45.0, aspect : canvas.width / canvas.height, near : 0.10, far : 500.0});
        this.renderer._props.props.viewport = { x : 1, y : 1, width: canvas.width, height: canvas.height };
    }

    this.mouseDown = function (event) {
        this.lastX = event.clientX;
        this.lastY = event.clientY;
        this.dragging = true;
    }

    this.mouseUp = function() {
        this.dragging = false;

    }

    /* On a mouse drag, we'll re-render the scene, passing in
     * incremented angles in each time.
     */
    this.pitch = 0;
    this.mouseMove = function(event) {
        if (this.dragging) {
            pitch = (event.clientY - this.lastY) * 0.005;
            yaw = (event.clientX - this.lastX) * -0.005;

            if (model.currentPos == "Earth") {
                model.lookAt.rotateY(yaw);
            } else {
                model.lookAt.rotateUp(yaw);
            }
  
            if(model.currentPos=="Earth") {
              if(this.pitch+pitch>0.4)  pitch = 0;
              else if(this.pitch+pitch<-1.9)  pitch = 0;
            }
            this.pitch += pitch;
  		      this.lookAt.rotateRight(pitch);

            this.lastX = event.clientX;
            this.lastY = event.clientY;
        }
    }

    this.keyboard = function(e) {
        switch (e.keyCode) {
            case 119: model.lookAt.translate(0, 0, 0.2);  break;
            case 115: model.lookAt.translate(0, 0, -0.2);  break;
            case 97:  model.lookAt.translate(0.2, 0, 0);  break;
            case 100: model.lookAt.translate(-0.2, 0, 0);  break;
            default: return false;
        }
    }

    this.mouseWheel = function(event) {
        model.lookAt.translate(0.0, 0.0, event.wheelDelta / 120);
    }
    this.mouseWheel_firefox = function(event) {
        model.lookAt.translate(0.0, 0.0, event.detail);
    }
}