function(prop, value, item, inGlobalMode, isChanging){
            if(!this._curMat) {
                this._curMat = this.application.ninja.elementMediator.getMatrix(item);
//                this._transformCtr = item.elementModel.props3D.m_transformCtr || [0,0,0];
                // TODO - Always use the center for now until we support multiple selections
                this._transformCtr = [0,0,0];
                if(inGlobalMode) {
                    this._transformCtr = MathUtils.transformPoint(this._transformCtr, this._curMat);
                }
            }

            var curMat = this._curMat,
                delta = value.value,
                isRotating = false,
                xFormMat = Matrix.I(4),
                tMat = Matrix.I(4),
                mat = [];
            if(inGlobalMode) {

                if(!this._curProp) {
                    this._curProp = this.application.ninja.elementMediator.get3DProperty(item, prop);
                }

                delta -= this._curProp;
            }

            switch (prop)
            {
                case "xAngle":
                    xFormMat = Matrix.RotationX(MathUtils.DEG_TO_RAD * delta);
                    isRotating = true;
                    break;
                case "yAngle":
                    xFormMat = Matrix.RotationY(MathUtils.DEG_TO_RAD * delta);
                    isRotating = true;
                    break;
                case "zAngle":
                    xFormMat = Matrix.RotationZ(MathUtils.DEG_TO_RAD * delta);
                    isRotating = true;
                    break;
                case "x3D":
                    xFormMat[12] = delta;
                    break;
                case "y3D":
                    xFormMat[13] = delta;
                    break;
                case "z3D":
                    xFormMat[14] = delta;
                    break;
            }

            if(inGlobalMode) {

                if(isRotating) {

                    // pre-translate by the transformation center
                    tMat[12] = this._transformCtr[0];
                    tMat[13] = this._transformCtr[1];
                    tMat[14] = this._transformCtr[2];

                    glmat4.multiply(tMat, xFormMat, mat);

                    // translate back
                    tMat[12] = -this._transformCtr[0];
                    tMat[13] = -this._transformCtr[1];
                    tMat[14] = -this._transformCtr[2];

                    glmat4.multiply(mat, tMat, mat);
                    glmat4.multiply(mat, curMat, mat);
                } else {
                    glmat4.multiply(xFormMat, curMat, mat);
                }
            } else {
                if(isRotating) {
                    tMat[12] = this._transformCtr[0];
                    tMat[13] = this._transformCtr[1];
                    tMat[14] = this._transformCtr[2];

                    glmat4.multiply(curMat, tMat, mat);

                    // translate back
                    tMat[12] = -this._transformCtr[0];
                    tMat[13] = -this._transformCtr[1];
                    tMat[14] = -this._transformCtr[2];

                    glmat4.multiply(mat, xFormMat, mat);
                    glmat4.multiply(mat, tMat, mat);
                } else {
                    glmat4.multiply(curMat, xFormMat, mat);
                }
            }

            if(isChanging) {
                this.application.ninja.elementMediator.setMatrix(item, mat, true, "pi");
            } else {
                this.application.ninja.elementMediator.setMatrix(item, mat, false, "pi");

                if(!inGlobalMode) {
                    value.value = 0;
                }
            }
        }