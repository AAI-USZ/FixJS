function (action, target, paused) {
        cc.Assert(action != null, "no action");
        cc.Assert(target != null, "");
        //check if the action target already exists
        var element = this._searchElementByTarget(this._targets, target);
        //if doesnt exists, create a hashelement and push in mpTargets
        if (!element) {
            element = new cc.HashElement();
            element.paused = paused;
            element.target = target;
            element.id = target.id || "no id";
            this.selTarget = element;
            this._targets.push(element);
        }
        //creates a array for that eleemnt to hold the actions
        this._actionAllocWithHashElement(element);
        cc.Assert((element.actions.indexOf(action) == -1), "ActionManager.addAction(),");

        element.actions.push(action);
        action.startWithTarget(target);
    }