function() {
        this.mat = mat4.create();
        this.invMat = mat4.create();
        this.invMatY = mat4.create();
        this._projMat = mat4.create();
        mat4.perspective(20, game.width / game.height, 1.0, 1000.0, this._projMat);
        this._changedPosition = false;
        this._changedCenter = false;
        this._changedUpVector = false;
        this._changedProjection = false;
        this._x = 0;
        this._y = 0;
        this._z = 10;
        this._centerX = 0;
        this._centerY = 0;
        this._centerZ = 0;
        this._upVectorX = 0;
        this._upVectorY = 1;
        this._upVectorZ = 0;
        this._focus;
        this._focusing = function() {
        };
    }