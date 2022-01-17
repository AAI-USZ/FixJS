function(left, right, result) {
        if (typeof left === 'undefined') {
            throw new DeveloperError('left is required');
        }
        if (typeof right === 'undefined') {
            throw new DeveloperError('right is required');
        }
        if (typeof result === 'undefined') {
            return new Cartesian4(left.x * right.x, left.y * right.y, left.z * right.z, left.w * right.w);
        }
        result.x = left.x * right.x;
        result.y = left.y * right.y;
        result.z = left.z * right.z;
        result.w = left.w * right.w;
        return result;
    }