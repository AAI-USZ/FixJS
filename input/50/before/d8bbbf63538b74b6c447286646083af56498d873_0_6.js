function(mimeType, quality) {
        try {
            // If this call fails (due to browser bug, like in Firefox 3.6),
            // then revert to previous no-parameter image/png behavior
            return this.getCanvas().toDataURL(mimeType, quality);
        }
        catch(e) {
            return this.getCanvas().toDataURL();
        }
    }