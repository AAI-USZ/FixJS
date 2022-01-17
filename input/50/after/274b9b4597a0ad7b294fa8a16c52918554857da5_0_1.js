function (shape) {
        var toKeep = (shape.owner === owner) || !shape.isDead();
        if (!toKeep) {
            killedShapes = killedShapes.concat(shape.chain.values());
        }
        return toKeep;
    }