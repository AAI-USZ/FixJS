function () {
        var count = 0;
        var totalBytes = 0;
        for (var key in this.textures) {
            var tex = this.textures[key];
            var bpp = tex.bitsPerPixelForFormat();
            // Each texture takes up width * height * bytesPerPixel bytes.
            var bytes = tex.getPixelsWide() * tex.getPixelsHigh() * bpp / 8;
            totalBytes += bytes;
            count++;
            cc.log("cocos2d: '" + tex.toString() + "' id=" + tex.getName() + " " + tex.getPixelsWide() + " x " + tex.getPixelsHigh() + " @ " + bpp + " bpp => " + bytes / 1024 + " KB");
        }

        cc.log("cocos2d: TextureCache dumpDebugInfo: " + count + " textures, for " + (totalBytes / 1024) + " KB (" + (totalBytes / (1024.0 * 1024.0)).toFixed(2) + " MB)");
    }