function(  ) {
        proj = mat4.identity( mat4.create( ) );

        var tanFov2 = Math.tan( this._fov / 2 );
        var k = 1 / tanFov2;

        proj[0] = this._aspect * k;
        proj[5] = k;
        proj[10] = ( this._near + this._far ) / (this._near - this._far );
        proj[11] = -( (2 * this._near * this._far) / (this._near - this._far ) );

        proj[14] = -1;
        proj[15] = 0;
        proj = mat4.transpose( proj );
        return proj;
    }