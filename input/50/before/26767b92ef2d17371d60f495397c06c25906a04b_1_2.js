function() {
                    for ( var i = 0; i < _locations.length; ++i) {
                        _gl.uniformMatrix2fv(_locations[i], false, this.value[i].values);
                    }
                }