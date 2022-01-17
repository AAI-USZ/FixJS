function (action) {
        // explicit null handling
        if (action == null) {
            return;
        }
        var target = action.getOriginalTarget();
        var element = this._searchElementByTarget(this._targets, target);

        if (element) {
            for (var i = 0; i < element.actions.length; i++) {
                if (element.actions[i] == action) {
                    element.actions.splice(i, 1);
                    break;
                }
            }
        } else {
            cc.Log("cocos2d: removeAction: Target not found");
        }
    }