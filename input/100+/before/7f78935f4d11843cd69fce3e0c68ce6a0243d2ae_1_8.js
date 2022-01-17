function(positionIndex, polyline, buffer){
        var positionsLength = this._getPolylinePositionsLength(polyline);
        positionIndex += this._getPolylineStartIndex(polyline);

        var index = 0;
        var color = polyline.getColor();
        var red = Color.floatToByte(color.red);
        var green = Color.floatToByte(color.green);
        var blue = Color.floatToByte(color.blue);
        var alpha = Color.floatToByte(color.alpha);
        var colorsArray = new Uint8Array(positionsLength * 4);
        for ( var j = 0; j < positionsLength; ++j) {
            colorsArray[index] = red;
            colorsArray[index + 1] = green;
            colorsArray[index + 2] = blue;
            colorsArray[index + 3] = alpha;
            index += 4;
        }
        buffer.copyFromArrayView(colorsArray, 4 * positionIndex);
    }