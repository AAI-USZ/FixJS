function()
            {
                //console.log("Configure Camera");
                this.camera.debug = false;
                this.camera.trap.size.x = Math.round(224 * ig.system.scale);
                this.camera.trap.size.y = Math.round(ig.system.height / 3);
                //this.camera.offset.x = 0;
                var cameraMinY = 0;//this.showStats ? -16 : 0;
                this.camera.min.x = 8;
                this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
                //TODO need a way to reset this
                this.camera.min.y = this.cameraOffsetY;
                this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;

                console.log("camera", this.camera.pos, this.camera.offset);
            }