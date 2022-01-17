function (target) {
        cc.Assert(target != null, "");

        // custom selectors
        var element = cc.HASH_FIND_INT(this._hashForSelectors, target);

        if (element) {
            element.paused = false;
        }

        //update selector
        var elementUpdate = cc.HASH_FIND_INT(this._hashForUpdates, target);

        if (elementUpdate) {
            cc.Assert(elementUpdate.entry != null, "Scheduler.resumeTarget():entry must be non nil");
            elementUpdate.entry.paused = false;
        }
    }