function partitionFlat(pa, partitionSize) {
        var newShape = new Array(pa.shape.length+1);
        var i;
        
        for (i=1;i<newShape.length;i++) {
            newShape[i]=pa.shape[i-1];
        }
        // At this point newShape[0] and newShape[1] need to be adjusted to partitionCount and partitionSize

        newShape[0] = newShape[1] / partitionSize;
        newShape[1] = partitionSize;
        
        if (shapeToLength(newShape) != shapeToLength(pa.shape)) {
            throw new RangeError("Attempt to partition ParallelArray unevenly.");
        }
        var newPA = new ParallelArray();
        newPA.shape = newShape;
        newPA.strides = shapeToStrides(newShape);
        newPA.offset = pa.offset;
        newPA.data = pa.data;
        return newPA;
    }