function(data) {
            var resource = data.resourceSets[0].resources[0];

            var url = resource.imageUrl;
            url = url.replace('{subdomain}', resource.imageUrlSubdomains[0]);
            url = url.replace('{culture}', '');
            that._url = url;

            that.tileWidth = resource.imageWidth;
            that.tileHeight = resource.imageHeight;
            that.zoomMin = resource.zoomMin;
            that.zoomMax = resource.zoomMax;

            that._deferredQueue.forEach(function(element) {
                that._loadImage(element);
            });
            that._deferredQueue = [];
        }