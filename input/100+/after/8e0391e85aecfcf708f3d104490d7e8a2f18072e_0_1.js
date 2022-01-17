function(camera){
            if(modula.draw){
                modula.draw.setContext(this.context);
            }
            
            this._size = this.get('size');
            canvas.width = this._size.x;
            canvas.height = this._size.y;

            this.context.save();
            this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
            if(this.background){
                this.context.fillStyle = this.background;
                this.context.fillRect(0,0,this.canvas.width, this.canvas.height);
            }
            this.context.globalCompositeOperation = this.globalCompositeOperation;
            this.context.globalAlpha = this.globalAlpha;
            if(camera){
                this.context.rotate(-camera.transform.rotation);
                this.context.scale(1/camera.transform.scale.x, 1/camera.transform.scale.y);
                this.context.translate(
                    -camera.transform.pos.x + (this.canvas.width/2 *camera.transform.scale.x), 
                    -camera.transform.pos.y + this.canvas.height/2 *camera.transform.scale.x
                );
            }
        }