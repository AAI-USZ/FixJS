function () {
        var ret = 0;

        switch (this._pixelFormat) {
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888:
                ret = 32;
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB565:
                ret = 16;
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_A8:
                ret = 8;
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444:
                ret = 16;
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB5A1:
                ret = 16;
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_PVRTC4:
                ret = 4;
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_PVRTC2:
                ret = 2;
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_I8:
                ret = 8;
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_AI88:
                ret = 16;
                break;
            case cc.TEXTURE_2D_PIXEL_FORMAT_RGB888:
                ret = 24;
                break;
            default:
                ret = -1;
                cc.Assert(false, "illegal pixel format");
                cc.log("bitsPerPixelForFormat: %d, cannot give useful result", this._pixelFormat);
                break;
        }
        return ret;
    }