function (child, doCleanup) {
        // IMPORTANT:
        //  -1st do onExit
        //  -2nd cleanup
        if (this._isRunning) {
            child.onExitTransitionDidStart();
            child.onExit();
        }

        // If you don't do cleanup, the child's actions will not get removed and the
        // its scheduledSelectors_ dict will not get released!
        if (doCleanup) {
            child.cleanup();
        }

        // set parent nil at the end
        child.setParent(null);

        cc.ArrayRemoveObject(this._children, child);
    }