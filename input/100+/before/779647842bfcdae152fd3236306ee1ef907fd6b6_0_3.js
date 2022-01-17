function fastGet2D (index, index2) {
                var result;
                var aLen = arguments.length;
                if (aLen === 2) {
                    return this.data[this.offset + index * this.strides[0] + index2];
                } else if (aLen === 1) {
                    if (typeof index === "number") {
                        result = new Fast1DPA(this);
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
                } else if (aLen === 0) {
                    return this;
                } else {
                    throw "too many indices in get call";
                }
            }