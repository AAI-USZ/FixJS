function(context) {
            if(!!this.attrs.image) {
                var width = this.getWidth();
                var height = this.getHeight();

                context.beginPath();
                context.rect(0, 0, width, height);
                context.closePath();
                this.fill(context);
                this.stroke(context);

                // if cropping
                if(this.attrs.crop && this.attrs.crop.width && this.attrs.crop.height) {
                    var cropX = this.attrs.crop.x ? this.attrs.crop.x : 0;
                    var cropY = this.attrs.crop.y ? this.attrs.crop.y : 0;
                    var cropWidth = this.attrs.crop.width;
                    var cropHeight = this.attrs.crop.height;
                    this.drawImage(context, this.attrs.image, cropX, cropY, cropWidth, cropHeight, 0, 0, width, height);
                }
                // no cropping
                else {
                    this.drawImage(context, this.attrs.image, 0, 0, width, height);
                }
            }
        }