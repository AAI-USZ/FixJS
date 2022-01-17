function(){
                this.stats.score = (this.stats.doors * 50) + (this.stats.kills * 5);
                this.parent();

                console.log("camera", this.camera.pos, this.camera.offset);
            }