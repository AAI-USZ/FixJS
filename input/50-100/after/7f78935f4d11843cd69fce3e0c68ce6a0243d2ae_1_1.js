function(positionIndex, polyline, buffer){
        var positionsLength = this._getPolylinePositionsLength(polyline);
        if(positionsLength){
            positionIndex += this._getPolylineStartIndex(polyline);
            var show = polyline.getShow();
            var showArray = new Uint8Array(positionsLength);
            for ( var j = 0; j < positionsLength; ++j) {
                showArray[j] = show;
            }
            buffer.copyFromArrayView(showArray, positionIndex);
        }
    }