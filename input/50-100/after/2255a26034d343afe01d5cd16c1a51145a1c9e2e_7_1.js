function() {
            // If an animation sheet has been set, it will fired here
            if (this.animCur.id != -1) {
                this.animSet.crop(this);
            }
            
            // Output debug box
            if (cp.debug.showCollisions === true) {
                cp.ctx.fillStyle = '#f00';
                cp.ctx.globalAlpha = .7;
                cp.ctx.fillRect(this.x, this.y, this.width, this.height);
                cp.ctx.globalAlpha = 1;
            }
            
            // Call this._super() to continue drawing
        }