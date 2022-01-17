function (time) {
        var i, j;
        for (i = 0; i < this._gridSize.x + 1; ++i) {
            for (j = 0; j < this._gridSize.y + 1; ++j) {
                var v = this.originalVertex(cc.g(i, j));
                v.z += (Math.sin(Math.PI * time * this._waves * 2 + (v.y + v.x) * .01) * this._amplitude * this._amplitudeRate);
                cc.log("v.z offset is" + (Math.sin(Math.PI * time * this._waves * 2 + (v.y + v.x) * .01) * this._amplitude * this._amplitudeRate));
                this.setVertex(cc.g(i, j), v);
            }
        }
    }