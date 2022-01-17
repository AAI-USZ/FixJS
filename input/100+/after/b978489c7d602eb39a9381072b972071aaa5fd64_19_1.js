function (format, filePath, x, y, width, height) {
        if (typeof(format) == "number") {
            x = x || 0;
            y = y || 0;
            width = width || 0;
            height = height || 0;

            var ret = false;
            cc.Assert(format == cc.CCIMAGE_FORMAT_JPG || format == cc.CCIMAGE_FORMAT_PNG,
                "the image can only be saved as JPG or PNG format");

            var image = new cc.Image();
            if (image != null && this.getUIImageFromBuffer(image, x, y, width, height)) {
                var fullpath = cc.FileUtils.sharedFileUtils().getWriteablePath() + filePath;

                ret = image.saveToFile(fullpath);
            }

            return ret;
        } else if (typeof(format) == "string") {
            height = width || 0;
            width = y || 0;
            y = x || 0;
            x = filePath || 0;

            filePath = format;

            var ret = false;

            var image = new cc.Image();
            if (image != null && this.getUIImageFromBuffer(image, x, y, width, height)) {
                ret = image.saveToFile(filePath);
            }
            return ret;
        }
    }