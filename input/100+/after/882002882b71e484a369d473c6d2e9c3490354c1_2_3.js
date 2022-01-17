function(uniform) {
        var uniformType = uniform.type;
        if (typeof uniformType === 'undefined') {
            var imageMatcher = new RegExp('^((data:)|((.)+\\.(gif|jpg|jpeg|tiff|png)$))', 'i');
            var type = typeof uniform;
            if (type === 'string') {
                if (imageMatcher.test(uniform) || uniform === 'agi_defaultTexture') {
                    uniformType = 'sampler2D';
                }
                else if (uniform === 'agi_defaultCubeMap') {
                    uniformType = 'samplerCube';
                }
                else {
                    uniformType = 'string';
                }
            }
            else if (type === 'number') {
                uniformType = 'float';
            }
            else if (type === 'object') {
                if (uniform instanceof Array) {
                    if (uniform.length === 4) {
                        uniformType = 'mat2';
                    }
                    else if (uniform.length === 9) {
                        uniformType = 'mat3';
                    }
                    else if (uniform.length === 16) {
                        uniformType = 'mat4';
                    }
                }
                else {
                    var numAttributes = 0;
                    for (var attribute in uniform) {
                        if (uniform.hasOwnProperty(attribute)) {
                            numAttributes += 1;
                        }
                    }
                    if (numAttributes >= 2 && numAttributes <= 4) {
                        uniformType = 'vec' + numAttributes;
                    }
                    else if (numAttributes === 6) {
                        if (imageMatcher.test(uniform.positiveX) && imageMatcher.test(uniform.negativeX) &&
                            imageMatcher.test(uniform.positiveY) && imageMatcher.test(uniform.negativeY) &&
                            imageMatcher.test(uniform.positiveZ) && imageMatcher.test(uniform.negativeZ)) {
                            uniformType = 'samplerCube';
                        }
                    }
                }
            }
        }
        return uniformType;
    }