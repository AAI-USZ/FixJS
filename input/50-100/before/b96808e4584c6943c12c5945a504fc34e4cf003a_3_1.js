function (model, expandSpec, recurse) {
        var left = getOrRecurse(model, expandSpec.left, recurse);
        var right = getOrRecurse(model, expandSpec.right, recurse);
        
        if (typeof(left) !== "object" || typeof(right) !== "object") {
            return left;
        }
        
        return fluid.merge(expandSpec.policy ? expandSpec.policy : null, {}, left, right);
    }