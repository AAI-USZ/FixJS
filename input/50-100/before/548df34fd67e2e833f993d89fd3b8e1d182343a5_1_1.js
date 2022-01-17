function(buffer, prop) {
            this['_' + prop] = buffer;
            Object.defineProperty(enchant.gl.mmd.MMesh.prototype, prop, {
                get: function() {
                    return this['_' + prop]._array;
                },
                set: function(array) {
                    this['_' + prop]._array = array;
                    if (this._appear) {
                        this['_' + prop]._bufferData();
                    }
                }
            });
        }