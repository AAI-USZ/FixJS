function (cleanup) {
        // not using detachChild improves speed here
        if (this._children != null) {
            for (var i = 0; i < this._children.length; i++) {
                var node = this._children[i];
                if (node) {
                    // IMPORTANT:
                    //  -1st do onExit
                    //  -2nd cleanup
                    if (this._isRunning) {
                        node.onExit();
                    }
                    if (cleanup) {
                        node.cleanup();
                    }
                    // set parent nil at the end
                    node.setParent(null);
                }
            }
            this._children = [];
        }
    }