function (dt) {
        // tile height is 64x32
        // map size: 30x30
        var p = this.tamara.getPositionInPixels();
        this.tamara.setVertexZ(-( (p.y + 32) / 16));
    }