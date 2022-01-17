function (shape) {
        var toKeep = (shape.owner === owner) || !shape.isDead();
        if (!toKeep) {
            killedShapes.push(shape.chain.values());
        }
        return toKeep;
    }