function(pos) {
        var front = this.createWheel( cp.vadd(pos, cp._v(47,-20) ) );
        this._chassis = this.createChassis( cp.vadd( pos, COG_ADJUSTMENT ) );
        this._rearWheel = this.createWheel( cp.vadd( pos, cp._v(-41, -20) ) );
        this.createCarJoints( this._chassis, front, this._rearWheel );

        this.setThrottle( 0 );
    }