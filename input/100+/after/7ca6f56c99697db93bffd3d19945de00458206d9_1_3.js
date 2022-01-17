function(min, max, invalidate)
            {
                min.setValues(this._vf.center);
                min.x -= 0.5 * this._vf.size.x;
                min.y -= 0.5 * this._vf.size.y;
                min.z -= x3dom.fields.Eps;
                
                max.setValues(this._vf.center);
                max.x += 0.5 * this._vf.size.x;
                max.y += 0.5 * this._vf.size.y;
                max.z += x3dom.fields.Eps;
                
                return true;
            }