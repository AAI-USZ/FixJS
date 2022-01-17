function() {
            // If an animation sheet has been set, it will fired here
            if (this.animCur.id != -1) {
                this.animSet.crop(this);
            }
            
            // Call this._super() to continue drawing
        }