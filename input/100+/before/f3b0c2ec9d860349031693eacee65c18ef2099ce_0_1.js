function( size ) {

        var imageSize = size.clone();
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

        this.tileCountUpToTier = [0];
        for (var i = 1; i < this.numberOfTiers; i++) {
            this.tileCountUpToTier.push(
                this.tierSizeInTiles[i-1].w * this.tierSizeInTiles[i-1].h +
                this.tileCountUpToTier[i-1]
                );
        }
    }