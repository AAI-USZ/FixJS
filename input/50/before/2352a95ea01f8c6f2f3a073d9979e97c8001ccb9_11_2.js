function() {
                    for ( var i = 0; i < _locations.length; ++i) {
                        _gl.uniformMatrix3fv(_locations[i], false, this.value[i].values);
                    }
                }