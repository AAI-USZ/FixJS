function() {
    if (!this.canvas) return;
    
    var canvas = this.canvas;
    if (this.mode & C.M_CONTROLS_ENABLED) {
        if (!this.controls) {
            this.controls = new Controls(this);
            this.controls.update(canvas);
        }
    } else {
        if (this.controls) {
            this.controls.detach(canvas);
            this.controls = null;
        }
    }
    if (this.mode & C.M_INFO_ENABLED) {
        if (!this.info) {
            this.info = new InfoBlock(this);
            this.info.update(canvas);
        }
    } else {
        if (this.info) {
            this.info.detach(canvas);
            this.info = null;
        }
    }
    if (this.mode & C.M_HANDLE_EVENTS) {
        if (global_opts.setTabindex) {
            canvas.setAttribute('tabindex',this.__instanceNum);
        } 
        var scene = this.anim;
        if (scene && !scene.__subscribedEvts) {
            L.subscribeEvents(canvas, scene);
            scene.__subscribedEvts = true;
        }
    }

}