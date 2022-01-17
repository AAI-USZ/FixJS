function(uniform) {
        var uniformType = uniform.type;
        if (typeof uniformType === 'undefined') {
            var imageMatcher = new RegExp('^(.)+\\.(gif|jpg|jpeg|tiff|png)$', 'i');
            var type = typeof uniform;
            if (type === 'string') {
                if (imageMatcher.test(uniform)) {
                    uniformType = 'sampler2D';
                }
                else {
                    uniformType = 'string';
                }
            }
            else if (type === 'number') {
                uniformType = 'float';
            }
            else if (type === 'object') {
                var numAttributes = 0;
                for (var attribute in uniform) {
                    if (uniform.hasOwnProperty(attribute) && attribute !== 'type') {
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
        return uniformType;
    }