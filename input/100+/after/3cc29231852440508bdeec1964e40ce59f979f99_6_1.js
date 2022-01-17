function(element, isStage) {
            isStage = false;
            var xformStr = this.getElementStyle(element, "-webkit-transform", true, isStage),
                mat,
                index1,
                index2,
                substr,
                numArray,
                nNums,
                i;

            if (xformStr) {
                // Check for 3d matrix
                index1 = xformStr.indexOf( "matrix3d(");
                // If style does not contain 'matrix3d', try computed matrix/matrix3d from rotateY, translateZ, etc.
                if((index1 === -1) && element.ownerDocument.defaultView) {
                    xformStr = element.ownerDocument.defaultView.getComputedStyle(element).getPropertyValue("-webkit-transform");
                    index1 = xformStr.indexOf( "matrix3d(");
                }
                if (index1 >= 0) {
                    index1 += 9;    // do not include 'matrix3d('
                    index2 = xformStr.indexOf( ")", index1 );
                    if (index2 >= 0) {
                        substr = xformStr.substr( index1, (index2-index1));
                        if (substr && (substr.length > 0)) {
                            numArray = substr.split(',');
                            nNums = numArray.length;
                            if (nNums == 16) {
                                // gl-matrix wants row order
                                mat = numArray;
                                for (i=0;  i<16;  i++) {
                                    mat[i] = Number( mat[i] );
                                }
                            }
                        }
                    }
                } else {
                    // Check for 2d matrix
                    index1 = xformStr.indexOf( "matrix(");
                    if (index1 >= 0) {
                        index1 += 7;    // do not include 'matrix('
                        index2 = xformStr.indexOf( ")", index1 );
                        if (index2 >= 0) {
                            substr = xformStr.substr( index1, (index2-index1));
                            if (substr && (substr.length > 0)) {
                                numArray = substr.split(',');
                                nNums = numArray.length;
                                if (nNums === 6) {
                                    // gl-matrix wants row order
                                    mat = Matrix.I(4);
                                    mat[0] = Number(numArray[0]);
                                    mat[1] = Number(numArray[1]);
                                    mat[4] = Number(numArray[2]);
                                    mat[5] = Number(numArray[3]);
                                    mat[12] = Number(numArray[4]);
                                    mat[13] = Number(numArray[5]);
                                }
                            }
                        }
                    }
                }
            }
            return mat;
        }