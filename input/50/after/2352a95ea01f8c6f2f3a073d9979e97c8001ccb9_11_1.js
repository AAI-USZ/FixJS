function() {
                    _gl.uniformMatrix3fv(_location, false, Matrix3.toArray(this.value));
                }