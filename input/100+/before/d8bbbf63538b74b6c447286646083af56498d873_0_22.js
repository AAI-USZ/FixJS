function() {
            if(!!this.attrs.image) {
                var context = this.getContext();
                var anim = this.attrs.animation;
                var index = this.attrs.index;
                var f = this.attrs.animations[anim][index];

                context.beginPath();
                context.rect(0, 0, f.width, f.height);
                context.closePath();

                this.drawImage(this.attrs.image, f.x, f.y, f.width, f.height, 0, 0, f.width, f.height);
            }
        }