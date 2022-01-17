function(mimeType, quality) {
        return this.getCanvas().toDataURL(mimeType, quality);
    }