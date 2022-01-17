function(json, operands) {
        return jpath.exec(json, operands.slice(0, 2)) == jpath.exec(json, operands.slice(2));
    }