function() {
        var m = new Kinetic.Transform();

        if(this.attrs.x !== 0 || this.attrs.y !== 0) {
            m.translate(this.attrs.x, this.attrs.y);
        }
        if(this.attrs.rotation !== 0) {
            m.rotate(this.attrs.rotation);
        }
        if(this.attrs.scale.x !== 1 || this.attrs.scale.y !== 1) {
            m.scale(this.attrs.scale.x, this.attrs.scale.y);
        }
        if(this.attrs.offset.x !== 0 || this.attrs.offset.y !== 0) {
            m.translate(-1 * this.attrs.offset.x, -1 * this.attrs.offset.y);
        }

        return m;
    }