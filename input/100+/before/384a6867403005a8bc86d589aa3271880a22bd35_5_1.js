function(arg) {
        // if arg is already an image object, just return it
        if(this._isElement(arg)) {
            return arg;
        }

        // if arg is a string, then it's a data url
        if(this._isString(arg)) {
            var imageObj = new Image();
            imageObj.src = arg;
            return imageObj;
        }

        //if arg is an object that contains the data property, it's an image object
        if(arg.data) {
            var canvas = document.createElement('canvas');
            canvas.width = arg.width;
            canvas.height = arg.height;
            var context = canvas.getContext('2d');
            context.putImageData(arg, 0, 0);
            var dataUrl = canvas.toDataURL();
            var imageObj = new Image();
            imageObj.src = dataUrl;
            return imageObj;
        }

        // default
        return null;
    }