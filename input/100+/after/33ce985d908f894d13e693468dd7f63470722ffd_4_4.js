function(cartographicPick) {
        // Find the tile in the render list that overlaps this extent
        var renderList = this._renderList;
        var tile;
        for (var i = 0, len = renderList.length; i < len; ++i) {
            tile = renderList[i];
            if (tile.extent.contains(cartographicPick)) {
                break;
            }
        }

        if (typeof tile !== 'undefined') {
            console.log('x: ' + tile.x + ' y: ' + tile.y + ' level: ' + tile.level);
        }


        this._boundingSphereTile = tile;
        this._boundingSphereVA = undefined;
    }