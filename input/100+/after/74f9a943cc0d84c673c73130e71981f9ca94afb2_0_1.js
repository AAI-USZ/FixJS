function( size ) {

        var imageSize = size.clone();
        this.size = size.clone();
        var tiles = new OpenLayers.Size(
            Math.ceil( imageSize.w / this.standardTileSize ),
            Math.ceil( imageSize.h / this.standardTileSize )
            );

        this.tierSizeInTiles = [tiles];
        this.tierImageSize = [imageSize];

        while (imageSize.w > this.standardTileSize ||
               imageSize.h > this.standardTileSize ) {

            imageSize = new OpenLayers.Size(
                Math.floor( imageSize.w / 2 ),
                Math.floor( imageSize.h / 2 )
                );
            tiles = new OpenLayers.Size(
                Math.ceil( imageSize.w / this.standardTileSize ),
                Math.ceil( imageSize.h / this.standardTileSize )
                );
            this.tierSizeInTiles.push( tiles );
            this.tierImageSize.push( imageSize );
        }

        this.tierSizeInTiles.reverse();
        this.tierImageSize.reverse();

        this.numberOfTiers = this.tierSizeInTiles.length;
        var resolutions = [1];
        this.tileCountUpToTier = [0];
        for (var i = 1; i < this.numberOfTiers; i++) {
            resolutions.unshift(Math.pow(2, i));
            this.tileCountUpToTier.push(
                this.tierSizeInTiles[i-1].w * this.tierSizeInTiles[i-1].h +
                this.tileCountUpToTier[i-1]
                );
        }
        if (!this.serverResolutions) {
            this.serverResolutions = resolutions;
        }
    }