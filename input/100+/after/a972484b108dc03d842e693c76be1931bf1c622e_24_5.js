function (image, POTWide, POTHigh) {
        var data = null;
        var tempData = null;
        var inPixel32 = null;
        var outPixel16 = null;
        var hasAlpha;
        var imageSize = new cc.Size();
        var pixelFormat = new cc.Texture2DPixelFormat();
        var bpp = new cc.size_t();
        hasAlpha = image.hasAlpha();
        bpp = image.getBitsPerComponent();

        // compute pixel format
        if (hasAlpha) {
            pixelFormat = cc.g_defaultAlphaPixelFormat;
        }
        else {
            if (bpp >= 8) {
                pixelFormat = cc.TEXTURE_2D_PIXEL_FORMAT_RGB888;
            }
            else {
                cc.log("cocos2d: cc.Texture2D: Using RGB565 texture since image has no alpha");
                pixelFormat = cc.TEXTURE_2D_PIXEL_FORMAT_RGB565;
            }
        }


        imageSize = cc.SizeMake(image.getWidth(), image.getHeight());

        switch (pixelFormat) {
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888:
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444:
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB5A1:
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB565:
            case cc.TEXTURE_2D_PIXEL_FORMAT_A8:
                tempData = image.getData();
                cc.Assert(tempData != null, "null image data.");

                if (image.getWidth() == POTWide && image.getHeight() == POTHigh) {
                    data = new (POTHigh * POTWide * 4);
                    cc.memcpy(data, tempData, POTHigh * POTWide * 4);
                }
                else {
                    data = new (POTHigh * POTWide * 4);

                    var pPixelData = tempData;
                    var pTargetData = data;

                    var imageHeight = image.getHeight();
                    for (var y = 0; y < imageHeight; ++y) {
                        cc.memcpy(pTargetData + POTWide * 4 * y, pPixelData + (image.getWidth()) * 4 * y, (image.getWidth()) * 4);
                    }
                }

                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB888:
                tempData = image.getData();
                cc.Assert(tempData != null, "null image data.");
                if (image.getWidth() == POTWide && image.getHeight() == POTHigh) {
                    data = new (POTHigh * POTWide * 3);
                    cc.memcpy(data, tempData, POTHigh * POTWide * 3);
                }
                else {
                    data = new (POTHigh * POTWide * 3);

                    var pPixelData = tempData;
                    var pTargetData = data;

                    var imageHeight = image.getHeight();
                    for (var y = 0; y < imageHeight; ++y) {
                        cc.memcpy(pTargetData + POTWide * 3 * y, pPixelData + (image.getWidth()) * 3 * y, (image.getWidth()) * 3);
                    }
                }
                break;
            default:
                cc.Assert(0, "Invalid pixel format");
        }

        // Repack the pixel data into the right format

        if (pixelFormat == cc.TEXTURE_2D_PIXEL_FORMAT_RGB565) {
            //Convert "RRRRRRRRRGGGGGGGGBBBBBBBBAAAAAAAA" to "RRRRRGGGGGGBBBBB"
            tempData = new (POTHigh * POTWide * 2);
            inPixel32 = data;
            outPixel16 = tempData;

            var length = POTWide * POTHigh;
            for (var i = 0; i < length; ++i, ++inPixel32) {
                outPixel16++;
                outPixel16 =
                    ((((inPixel32 >> 0) & 0xFF) >> 3) << 11) | // R
                        ((((inPixel32 >> 8) & 0xFF) >> 2) << 5) | // G
                        ((((inPixel32 >> 16) & 0xFF) >> 3) << 0);   // B
            }

            delete data;
            data = tempData;
        }
        else if (pixelFormat == cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444) {
            //Convert "RRRRRRRRRGGGGGGGGBBBBBBBBAAAAAAAA" to "RRRRGGGGBBBBAAAA"
            tempData = new (POTHigh * POTWide * 2);
            inPixel32 = data;
            outPixel16 = tempData;

            var length = POTWide * POTHigh;
            for (var i = 0; i < length; ++i, ++inPixel32) {
                outPixel16++;
                outPixel16 =
                    ((((inPixel32 >> 0) & 0xFF) >> 4) << 12) | // R
                        ((((inPixel32 >> 8) & 0xFF) >> 4) << 8) | // G
                        ((((inPixel32 >> 16) & 0xFF) >> 4) << 4) | // B
                        ((((inPixel32 >> 24) & 0xFF) >> 4) << 0); // A
            }

            delete data;
            data = tempData;
        }
        else if (pixelFormat == cc.TEXTURE_2D_PIXEL_FORMAT_RGB5A1) {
            //Convert "RRRRRRRRRGGGGGGGGBBBBBBBBAAAAAAAA" to "RRRRRGGGGGBBBBBA"
            tempData = new (POTHigh * POTWide * 2);
            inPixel32 = data;
            outPixel16 = tempData;

            var length = POTWide * POTHigh;
            for (var i = 0; i < length; ++i, ++inPixel32) {
                outPixel16++;
                outPixel16 =
                    ((((inPixel32 >> 0) & 0xFF) >> 3) << 11) | // R
                        ((((inPixel32 >> 8) & 0xFF) >> 3) << 6) | // G
                        ((((inPixel32 >> 16) & 0xFF) >> 3) << 1) | // B
                        ((((inPixel32 >> 24) & 0xFF) >> 7) << 0); // A
            }

            delete data;
            data = tempData;
        }
        else if (pixelFormat == cc.TEXTURE_2D_PIXEL_FORMAT_A8) {
            // fix me, how to convert to A8
            pixelFormat = cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888;

            /*
             * The code can not work, how to convert to A8?
             *
             tempData = new unsigned char[POTHigh * POTWide];
             inPixel32 = (unsigned int*)data;
             outPixel8 = tempData;

             unsigned int length = POTWide * POTHigh;
             for(unsigned int i = 0; i < length; ++i, ++inPixel32)
             {
             outPixel8++ = (inPixel32 >> 24) & 0xFF;
             }

             delete []data;
             data = tempData;
             */
        }

        if (data) {
            this.initWithData(data, pixelFormat, POTWide, POTHigh, imageSize);

            // should be after calling super init
            this._hasPremultipliedAlpha = image.isPremultipliedAlpha();

            //CGContextRelease(context);
            delete data;
        }
        return true;
    }