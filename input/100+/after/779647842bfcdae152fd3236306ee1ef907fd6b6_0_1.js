function get (index) {
        var i;
        var result;
        var offset;
        var argsAsArray; // For converting from arguements into a real array.
        if (this.flat) {
            if (index instanceof Array) {
                offset = this.offset;
                var len = index.length;
                for (i=0;i<len;i++) {
                    // if we go out of bounds, we return undefined
                    if (index[i] < 0 || index[i] >= this.shape[i]) return undefined;
                    offset = offset + index[i]*this.strides[i];
                }
                if (this.shape.length === index.length) {
                    return this.data[offset];
                } else {
                    // build a ParallelArray.
                    result = new ParallelArray(this);
                    result.offset = offset;
                    result.elementalType = this.elementalType;
                    /* need to fix up shape somehow. */
                    result.shape = this.shape.slice(index.length);
                    result.strides = this.strides.slice(index.length); 
                    /* changing the shape might invalidate the _fastClasses specialisation, 
                     * so better ensure things are still fine
                     */
                    if (result.__proto__ !== ParallelArray.prototype) {
                        result.__proto__ = _fastClasses[result.shape.length].prototype;
                    }
                    return result;
               }
            } 
            //  else it is flat but not (index instanceof Array) 
            if (arguments.length == 1) { 
                // One argument that is a scalar index.
                if ((index < 0) || (index >= this.shape[0])) return undefined;
                if (this.shape.length == 1) {
                    // a 1D array
                    return this.data[this.offset + index];
                } else {
                    // we have a nD array and we want the first dimension so create the new array
                    offset = this.offset+this.strides[0]*index;
                    // build a ParallelArray.
                    result = new ParallelArray(this);
                    result.offset = offset;
                    result.elementalType = this.elementalType;
                    /* need to fix up shape somehow. */
                    result.shape = this.shape.slice(1);
                    result.strides = this.strides.slice(1); 
                    return result;
                }
            }
            // Still a flat array but more than on argument, turn into an array and recurse.
            argsAsArray = Array.prototype.slice.call(arguments);
            return this.get(argsAsArray);
        } // end flat array path.
        
        if (arguments.length == 1) {
            if (!(arguments[0] instanceof Array)) {
                return this.data[index];
            } else {
                // not flat, index is an array of indices.
                result = this;
                for (i=0;i<arguments[0].length;i++) {
                    result = result.data[arguments[0][i]];
                    // out of bounds => abort further selections
                    if (result === undefined) return result;
                }
                return result;
            }
        }
        // not flat, more than one argument.
        
        result = this;
        for (i=0;i<arguments.length;i++) {
            result = result.data[arguments[i]];
            // out of bounds => abort further selections
            if (result === undefined) return result;
        }
        return result;
    }