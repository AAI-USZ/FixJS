function(tileImagery) {
        var imageryProvider = this.imageryProvider;

        var url = imageryProvider.buildTileImageUrl(tileImagery.x, tileImagery.y, tileImagery.level);
        var hostname = getHostname(url);

        if (hostname !== '') {
            var activeRequestsForHostname = defaultValue(activeTileImageRequests[hostname], 0);

            //cap image requests per hostname, because the browser itself is capped,
            //and we have no way to cancel an image load once it starts, but we need
            //to be able to reorder pending image requests
            if (activeRequestsForHostname > 6) {
                // postpone loading tile
                tileImagery.state = TileState.UNLOADED;
                return;
            }

            activeTileImageRequests[hostname] = activeRequestsForHostname + 1;
        }

        when(imageryProvider.loadTileImage(url), function(image) {
            activeTileImageRequests[hostname]--;

            tileImagery.image = image;

            if (typeof image === 'undefined') {
                tileImagery.state = TileState.INVALID;
                return;
            }

            tileImagery.state = TileState.RECEIVED;
        }, function() {
            tileImagery.state = TileState.FAILED;
        });
    }