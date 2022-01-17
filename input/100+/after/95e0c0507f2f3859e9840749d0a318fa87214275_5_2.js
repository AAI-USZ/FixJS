function() {

        if (this.duration > 0) {

            var d = new Date();

            if (this.duration > 0 && this.frames > 0) {
                this.ftime = d.getTime() + (this.duration / this.frames);
            } else {
                this.ftime = 0;
            }

            this.offset.x = this.width * this.currentFrame;

            if (this.currentFrame === (this.frames - 1)) {
                this.currentFrame = 0;
                this.iterations++;
                this.emit("iteration");
            } else {
                this.currentFrame++;
            }

            if (this.currentFrame === this.keyframe) {
                this.emit("keyframe");
            }

        }

        return this;
    }