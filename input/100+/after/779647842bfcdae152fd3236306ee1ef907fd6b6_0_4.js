function fastGet3D (index, index2, index3) {
                var result;
                var aLen = arguments.length;
                if (aLen === 3) {
                    if ((index < 0) || (index >= this.shape[0]) || (index2 < 0) || (index2 >= this.shape[1]) || (index3 < 0) || (index3 >= this.shape[2])) return undefined;
                    return this.data[this.offset + index * this.strides[0] + index2 * this.strides[1] + index3];
                } else if (aLen === 2) {
                    if ((index < 0) || (index >= this.shape[0]) || (index2 < 0) || (index2 >= this.shape[1])) return undefined;
                    result = new Fast1DPA(this);
                    result.offset = this.offset + index * this.strides[0] + index2 * this.strides[1];
                    result.elementalType = this.elementalType;
                    /* need to fix up shape somehow. */
                    result.shape = this.shape.slice(2);
                    result.strides = this.strides.slice(2); 
                    return result;
                } else if (aLen === 1) {
                    if (typeof index === "number") {
                        if ((index < 0) || (index >= this.shape[0])) return undefined;
                        result = new Fast2DPA(this);
                        result.offset = this.offset + index * this.strides[0];
                        result.elementalType = this.elementalType;
                        /* need to fix up shape somehow. */
                        result.shape = this.shape.slice(1);
                        result.strides = this.strides.slice(1); 
                        return result;
                    } else {
                        /* fall back to slow mode */
                        return this.__proto__.__proto__.get.call(this, index);
                    }
                } else {
                    throw "too many indices in get call";
                }
            }