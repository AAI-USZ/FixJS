function( mobj, shape, type) {
        this.data = mobj;
        this.shape = shape;
        this.elementalType = type;
        this.strides = shapeToStrides( shape);
        this.flat = true;
        this.offset = 0;

        return this;
    }