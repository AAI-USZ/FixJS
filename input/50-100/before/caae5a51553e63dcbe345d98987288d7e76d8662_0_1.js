function() {
        var go = Kinetic.GlobalObject;
        var radius = this.getRadius();
        // if radius is already an object then return
        if(go._isObject(radius)) {
            return false;
        }
        var pos = go._getXY(radius);
        this.setAttrs({
            radius: pos
        });
    }