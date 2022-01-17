function fastGet1D (index) {
                var aLen = arguments.length;
                if (aLen === 1) {
                    if (typeof(index) === "number") {
                        if ((index < 0) || (index >= this.shape[0])) return undefined;
                        return this.data[this.offset + index];
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