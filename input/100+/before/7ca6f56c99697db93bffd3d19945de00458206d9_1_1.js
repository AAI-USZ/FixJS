function(aspect)
            {
                var fovy = this._vf.fieldOfView;
                var zfar = this._vf.zFar;
                var znear = this._vf.zNear;

                if (znear <= 0 || zfar <= 0)
                {
                    var zRatio = 100000;    // 10000
                    var nearScale = 0.8, farScale = 1.2;
                    var viewarea = this._nameSpace.doc._viewarea;
                    
                    var min = new x3dom.fields.SFVec3f();
                    min.setValues(viewarea._scene._lastMin);
                    
                    var max = new x3dom.fields.SFVec3f();
                    max.setValues(viewarea._scene._lastMax);
                    
                    var dia = max.subtract(min);
                    var sRad = dia.length() / 2;
                    
                    var mat = viewarea.getViewMatrix().inverse();
                    var vp = mat.e3();
                    
                    var sCenter = min.add(dia).multiply(0.5);
                    var vDist = vp.subtract(sCenter).length();
                    
                    if (sRad) {
                        if (vDist > sRad) {
                            // Camera outside scene
                            znear = (vDist - sRad) * nearScale;
                        }
                        else {
                            // Camera inside scene
                            znear = x3dom.fields.Eps;
                        }
                        zfar = (vDist + sRad) * farScale;
                    }
                    else {
                        znear = 0.1;
                        zfar = 100000;
                    }
                    
                    var zNearLimit = zfar / zRatio;
                    znear = (znear > zNearLimit) ? znear : zNearLimit;
                    //x3dom.debug.logInfo("\nVP: " + vp + "\nCT: " + sCenter + "\nNF: " + znear + " -> " + zfar);
                    
                    if (this._vf.zFar > 0)
                        zfar = this._vf.zFar;
                    if (this._vf.zNear > 0)
                        znear = this._vf.zNear;
                }

                if (this._projMatrix == null)
                {
                    var f = 1 / Math.tan(fovy / 2);
                    
                    this._projMatrix = new x3dom.fields.SFMatrix4f(
                        f/aspect, 0, 0, 0,
                        0, f, 0, 0,
                        0, 0, (znear+zfar)/(znear-zfar), 2*znear*zfar/(znear-zfar),
                        0, 0, -1, 0
                    );

                    this._lastAspect = aspect;
                }
                else if (this._lastAspect !== aspect)
                {
                    this._projMatrix._00 = (1 / Math.tan(fovy / 2)) / aspect;
                    this._lastAspect = aspect;
                }
                else if (znear <= 0 || zfar <= 0)
                {
                    this._projMatrix._22 = (znear+zfar)/(znear-zfar);
                    this._projMatrix._23 = 2*znear*zfar/(znear-zfar);
                }

                return this._projMatrix;
            }