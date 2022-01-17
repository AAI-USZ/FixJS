function(){
            if (!this.enabled) {
                this.handler.mousedown(this.dragHandle);
                this.enabled = true;
            }
            return this;
        }