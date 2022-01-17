function(positionIndex, polyline, buffer){
        var positionsLength = this._getPolylinePositionsLength(polyline);
        if(positionsLength){
            positionIndex += this._getPolylineStartIndex(polyline);
            var positionsArray = new Float32Array(positionsLength * 3);
            var index = 0;
            var positions = this._getPositions(polyline);
            for(var i = 0; i < positionsLength; ++i){
                var position = positions[i];
                positionsArray[index] = position.x;
                positionsArray[index + 1] = position.y;
                positionsArray[index + 2] = position.z;
                index += 3;
            }

            buffer.copyFromArrayView(positionsArray, 12 * positionIndex);
        }
    }