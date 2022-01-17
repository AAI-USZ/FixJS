function(config) {
        this.shapeType = "Image";
        config.drawFunc = function() {
            if(!!this.attrs.image) {
                var width = !!this.attrs.width ? this.attrs.width : this.attrs.image.width;
                var height = !!this.attrs.height ? this.attrs.height : this.attrs.image.height;
                var canvas = this.getCanvas();
                var context = this.getContext();

                context.beginPath();
                context.rect(0, 0, width, height);
                context.closePath();
                this.fill();
                this.stroke();

                // if cropping
                if(this.attrs.crop && this.attrs.crop.width && this.attrs.crop.height) {
                    var cropX = this.attrs.crop.x ? this.attrs.crop.x : 0;
                    var cropY = this.attrs.crop.y ? this.attrs.crop.y : 0;
                    var cropWidth = this.attrs.crop.width;
                    var cropHeight = this.attrs.crop.height;
                    this.drawImage(this.attrs.image, cropX, cropY, cropWidth, cropHeight, 0, 0, width, height);
                }
                // no cropping
                else {
                    this.drawImage(this.attrs.image, 0, 0, width, height);
                }
            }
        };
        // call super constructor
        this._super(config);

        /*
         * if image property is ever changed, check and see
         * if it was set to image data, and if it was, go ahead
         * and save it
         */
        this.on('beforeImageChange.kinetic', function(evt) {
            this._setImageData(evt.newVal);
        });
        /*
         * if image property was set with image data,
         * go ahead and save it
         */
        this._setImageData(config.image);
    }