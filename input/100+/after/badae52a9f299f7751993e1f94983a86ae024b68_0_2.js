function flatten () {
        var len = this.length;
        var newLength = 0;
        var result;
        var shape;
        var i;
        if (this.flat) {
            shape = this.getShape();
            if (shape.length == 1) {
                throw new TypeError("ParallelArray.flatten array is flat");
            }
            result = new ParallelArray();
            result.shape = shape.slice(1);
            result.shape[0] = result.shape[0] * shape[0];
            result.strides = this.strides.slice(1);
            result.offset = 0;
            result.flat = true;
            result.data = this.data;
            result.elementalType = this.elementalType;
            return result;
        }
        for (i=0;i<len;i++) {
            if (this.get(i) instanceof ParallelArray) {
                newLength = newLength+this.get(i).length;
            } else {
                throw new TypeError("ParallelArray.flatten not a ParallelArray of ParallelArrays.");
            }
        }
        var resultArray = new Array(newLength);
            var next = 0;
            for (i=0;i<len;i++) {
                var pa = this.get(i);
                    for (j=0; j<pa.length; j++) {
                        resultArray[next] = pa.get(j);
                            next++;                
                    }
            }
        
            var res = new ParallelArray(resultArray);
            return res;
    }