function(director,time) {
            var ctx= director.crc,
                radius = Math.min(this.width,this.height)/2;

            if(this.width != this.height)
                ctx.scale(this.width/radius, this.height/radius);

            ctx.lineWidth= this.lineWidth;
            ctx.globalCompositeOperation= this.compositeOp;
            if ( null!==this.fillStyle ) {
                ctx.fillStyle= this.fillStyle;
                ctx.beginPath();
                ctx.arc( this.width/2, this.height/2, radius, 0, 2*Math.PI, false );
                ctx.fill();
            }

            if ( null!==this.strokeStyle ) {
                ctx.strokeStyle= this.strokeStyle;
                ctx.beginPath();
                ctx.arc( this.width/2, this.height/2, radius, 0, 2*Math.PI, false );
                ctx.stroke();
            }
        }