function () {
        this._super();

        var inA, outA;
        this._inScene.setVisible(false);

        var inDeltaZ, inAngleZ;
        var outDeltaZ, outAngleZ;

        if (this._orientation == cc.ORIENTATION_RIGHT_OVER) {
            inDeltaZ = 90;
            inAngleZ = 270;
            outDeltaZ = 90;
            outAngleZ = 0;
        } else {
            inDeltaZ = -90;
            inAngleZ = 90;
            outDeltaZ = -90;
            outAngleZ = 0;
        }

        inA = cc.Sequence.create
            (
                cc.DelayTime.create(this._duration / 2),
                cc.Show.create(),
                //TODO
                cc.OrbitCamera.create(this._duration / 2, 1, 0, inAngleZ, inDeltaZ, 0, 0),
                cc.CallFunc.create(this, this.finish)
            );

        outA = cc.Sequence.create
            (
                cc.OrbitCamera.create(this._duration / 2, 1, 0, outAngleZ, outDeltaZ, 0, 0),
                cc.Hide.create(),
                cc.DelayTime.create(this._duration / 2)
            );

        this._inScene.runAction(inA);
        this._outScene.runAction(outA);
    }