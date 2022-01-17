function (shape) {
        var toKeep = !shape.isDead();
        if (!toKeep) {
            killedShapes = killedShapes.concat(shape.chain.values());
        }
        return toKeep;
    }