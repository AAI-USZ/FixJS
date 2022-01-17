function(matrix, result) {
        if (typeof matrix === 'undefined') {
            throw new DeveloperError('matrix is required');
        }

        // rT = negated rotational transpose
        var rTN = [-matrix[0], -matrix[1], -matrix[2],
                  -matrix[4], -matrix[5], -matrix[6],
                  -matrix[8], -matrix[9], -matrix[10]];

        // rTN = negated rotational transpose
        var rT = [matrix[0], matrix[1], matrix[2],
                   matrix[4], matrix[5], matrix[6],
                   matrix[8], matrix[9], matrix[10]];

        // T = translation, rTT = (rT)(T)
        var translation = Matrix4.getTranslation(matrix, invertTransformationScratch);
        var rTT = Matrix3.multiplyByVector(rTN, translation, invertTransformationScratch);
        return Matrix4.fromRotationTranslation(rT, rTT, result);
    }