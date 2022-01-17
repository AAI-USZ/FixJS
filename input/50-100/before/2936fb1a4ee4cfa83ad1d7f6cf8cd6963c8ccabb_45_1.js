function (dt) {
        // iterate using fast enumeration protocol
        var children = this._batchNode.getChildren();

        if (cc.ENABLE_PROFILERS) {
            cc.ProfilingBeginTimingBlock(this._profilingTimer);
        }

        for (var i = 0; i < children.length; i++) {
            var sprite = children[i];
            sprite.setIsVisible(false);
        }

        if (cc.ENABLE_PROFILERS) {
            cc.ProfilingEndTimingBlock(this._profilingTimer);
        }
    }