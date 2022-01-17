function (child, zOrder, tag) {
        var argnum = arguments.length;
        cc.Assert(child != null, "Argument must be non-nil");
        cc.Assert(child._parent == null, "child already added. It can't be added again");
        var tempzOrder = (zOrder != null) ? zOrder : child.getZOrder();
        var tmptag = (tag != null) ? tag : child.getTag();
        child.setTag(tmptag);

        if (!this._children) {
            this._childrenAlloc();
        }

        this._insertChild(child, tempzOrder);

        child.setParent(this);
        if (this._isRunning) {
            child.onEnter();
            child.onEnterTransitionDidFinish();
        }

    }