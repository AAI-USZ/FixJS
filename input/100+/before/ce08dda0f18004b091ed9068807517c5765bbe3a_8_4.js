function (dt) {
        this._updateHashLocked = true;

        if (this._timeScale != 1.0) {
            dt *= this._timeScale;
        }

        //Iterate all over the Updates selectors
        var tmpEntry;
        var i = 0;
        for (i = 0; i < this._updatesNegList.length; i++) {
            tmpEntry = this._updatesNegList[i];
            if ((!tmpEntry.paused) && (!tmpEntry.makedForDeletion)) {
                tmpEntry.target.update(dt);
            }
        }

        // updates with priority == 0
        for (i = 0; i < this._updates0List.length; i++) {
            tmpEntry = this._updates0List[i];
            if ((!tmpEntry.paused) && (!tmpEntry.makedForDeletion)) {
                tmpEntry.target.update(dt);
            }
        }

        // updates with priority > 0
        for (i = 0; i < this._updatesPosList.length; i++) {
            tmpEntry = this._updatesPosList[i];
            if ((!tmpEntry.paused) && (!tmpEntry.makedForDeletion)) {
                tmpEntry.target.update(dt);
            }
        }

        //Interate all over the custom selectors
        var elt;
        for (i = 0; i < this._hashForSelectors.length; i++) {
            this._currentTarget = this._hashForSelectors[i];
            elt = this._currentTarget;
            this._currentTargetSalvaged = false;

            if (!this._currentTarget.paused) {
                // The 'timers' array may change while inside this loop
                for (elt.timerIndex = 0; elt.timerIndex < elt.timers.length; elt.timerIndex++) {
                    elt.currentTimer = elt.timers[elt.timerIndex];
                    elt.currentTimerSalvaged = false;

                    elt.currentTimer.update(dt);
                    elt.currentTimer = null;
                }
            }

            if ((this._currentTargetSalvaged) && (this._currentTarget.timers.length == 0)) {
                this._removeHashElement(this._currentTarget);
            }
        }

        //delete all updates that are marked for deletion
        // updates with priority < 0
        for (i = 0; i < this._updatesNegList.length; i++) {
            if (this._updatesNegList[i].makedForDeletion) {
                this._removeUpdateFromHash(tmpEntry);
            }
        }

        // updates with priority == 0
        for (i = 0; i < this._updates0List.length; i++) {
            if (this._updates0List[i].makedForDeletion) {
                this._removeUpdateFromHash(tmpEntry);
            }
        }

        // updates with priority > 0
        for (i = 0; i < this._updatesPosList.length; i++) {
            if (this._updatesPosList[i].makedForDeletion) {
                this._removeUpdateFromHash(tmpEntry);
            }
        }

        this._updateHashLocked = false;
        this._currentTarget = null;
    }