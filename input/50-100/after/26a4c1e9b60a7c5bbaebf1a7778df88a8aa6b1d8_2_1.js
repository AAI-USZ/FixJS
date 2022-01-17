function set(x,y,z,width,height,depth) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.width = width || 0;
        this.height = height || 0;
        this.depth = depth || 0;
        return this;
    }