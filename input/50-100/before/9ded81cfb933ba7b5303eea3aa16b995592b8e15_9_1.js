function(url, textureAvailableCallback) {
        if (typeof url === 'undefined') {
            throw new DeveloperError('url is required.');
        }

        if (typeof textureAvailableCallback === 'undefined') {
            throw new DeveloperError('textureAvailableCallback is required.');
        }

        this.addTextureFromFunction(url, getImageFromUrl, textureAvailableCallback);
    }