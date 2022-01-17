function(m){
        var tx = (this.x * m.a0) + (this.y * m.a1) + (this.z * m.a2) + (m.a3);
        var ty= (this.x * m.b0) + (this.y * m.b1) + (this.z * m.b2) + (m.b3);
        var tz = (this.x * m.c0) + (this.y * m.c1) + (this.z * m.c2) + (m.c3);
        this.x = tx;
        this.y = ty;
        this.z = tz;
        return this;
    }