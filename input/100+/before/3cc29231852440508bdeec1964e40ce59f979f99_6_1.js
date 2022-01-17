function(element, isStage) {
            isStage = false;
            var xformStr = this.getElementStyle(element, "-webkit-transform", true, isStage),
                mat;

            if (xformStr) {
                var index1 = xformStr.indexOf( "matrix3d(");
                if (index1 >= 0) {
                    index1 += 9;    // do not include 'matrix3d('
                    var index2 = xformStr.indexOf( ")", index1 );
                    if (index2 >= 0) {
                        var substr = xformStr.substr( index1, (index2-index1));
                        if (substr && (substr.length > 0)) {
                            var numArray = substr.split(',');
                            var nNums = numArray.length;
                            if (nNums == 16) {
                                // gl-matrix wants row order
                                mat = numArray;
                                for (var i=0;  i<16;  i++) {
                                    mat[i] = Number( mat[i] );
                                }
                            }
                        }
                    }
                }
            }
            return mat;
        }