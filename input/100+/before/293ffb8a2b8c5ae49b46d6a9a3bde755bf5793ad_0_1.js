function( mobj, shape, type) {
        this.data = mobj;
        this.shape = shape;
        this.elementalType = type;
        this.strides = shapeToStrides( shape);
        this.flat = true;
        this.offset = 0;

        if (useLazyCommunication) {
            // wrap all functions that need access to the data
            requiresData(this, "get");
            requiresData(this, "partition");
            requiresData(this, "concat");
            requiresData(this, "join");
            requiresData(this, "slice");
            requiresData(this, "toString");
            requiresData(this, "getArray");
        } else {
            this.materialize();
        }

        return this;
    }