function() {
        var go = Kinetic.GlobalObject;
        var radius = this.getRadius();
        // if radius is already an object then return
        if(go._isObject(radius)) {
            return false;
        }

        /*
         * directly set radius attr to avoid
         * duplicate attr change event
         */
        this.attrs.radius = go._getXY(radius);
    }