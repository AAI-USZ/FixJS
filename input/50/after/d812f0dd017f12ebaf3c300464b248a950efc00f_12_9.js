function (dt) {
        // tile height is 64x32
        // map size: 30x30
        var p = this.tamara.getPosition();
        p = cc.POINT_POINTS_TO_PIXELS(p);
        this.tamara.setVertexZ(-( (p.y + 32) / 16));
    }