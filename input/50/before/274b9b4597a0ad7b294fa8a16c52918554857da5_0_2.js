function (shape) {
        var toKeep = !shape.isDead();
        if (!toKeep) {
            killedShapes.push(shape.chain.values());
        }
        return toKeep;
    }