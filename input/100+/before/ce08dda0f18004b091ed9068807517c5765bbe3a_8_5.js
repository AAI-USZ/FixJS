function () {
        // Custom Selectors
        var i;
        for (i = 0; i < this._hashForSelectors.length; i++) {
            // element may be removed in unscheduleAllSelectorsForTarget
            this.unscheduleAllSelectorsForTarget(this._hashForSelectors[i].target);
        }

        //updates selectors
        for (i = 0; i < this._updates0List.length; i++) {
            this.unscheduleUpdateForTarget(this._updates0List[i].target);
        }
        for (i = 0; i < this._updatesNegList.length; i++) {
            this.unscheduleUpdateForTarget(this._updatesNegList[i].target);
        }
        for (i = 0; i < this._updatesPosList.length; i++) {
            this.unscheduleUpdateForTarget(this._updatesPosList[i].target);
        }
    }