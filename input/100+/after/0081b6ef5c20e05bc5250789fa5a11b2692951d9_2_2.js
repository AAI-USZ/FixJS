function (index, element) {
        var action = element.actions[index];

        if ((action == element.currentAction) && (!element.currentActionSalvaged)) {
            element.currentActionSalvaged = true;
        }

        cc.ArrayRemoveObjectAtIndex(element.actions,index);

        // update actionIndex in case we are in tick. looping over the actions
        if (element.actionIndex >= index) {
            element.actionIndex--;
        }

        if (element.actions.length == 0) {
            if (this._currentTarget == element) {
                this._currentTargetSalvaged = true;
            } else {
                this._deleteHashElement(element);
            }
        }
    }