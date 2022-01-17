function() {
                    for ( var i = 0; i < _locations.length; ++i) {
                        _gl.uniformMatrix2fv(_locations[i], false, Matrix2.toArray(this.value[i]));
                    }
                }