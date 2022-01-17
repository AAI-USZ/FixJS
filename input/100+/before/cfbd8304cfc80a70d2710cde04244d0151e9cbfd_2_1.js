function (dt) {
        for (var elt = 0; elt < this._targets.length; elt++) {
            this._currentTarget = this._targets[elt];
            this._currentTargetSalvaged = false;
            if (!this._currentTarget.paused) {
                // The 'actions' CCMutableArray may change while inside this loop.
                for (this._currentTarget.actionIndex = 0; this._currentTarget.actionIndex < this._currentTarget.actions.length;
                     this._currentTarget.actionIndex++) {
                    this._currentTarget.currentAction = this._currentTarget.actions[this._currentTarget.actionIndex];
                    if (this._currentTarget.currentAction == null) {
                        continue;
                    }

                    this._currentTarget.currentActionSalvaged = false;

                    this._currentTarget.currentAction.step(dt);

                    if (this._currentTarget.currentActionSalvaged) {
                        // The currentAction told the node to remove it. To prevent the action from
                        // accidentally deallocating itself before finishing its step, we retained
                        // it. Now that step is done, it's safe to release it.
                        this._currentTarget.currentAction = null;//release
                    } else if (this._currentTarget.currentAction.isDone()) {
                        this._currentTarget.currentAction.stop();

                        var action = this._currentTarget.currentAction;
                        // Make currentAction nil to prevent removeAction from salvaging it.
                        this._currentTarget.currentAction = null;
                        this.removeAction(action);
                    }

                    this._currentTarget.currentAction = null;
                }
            }

            // elt, at this moment, is still valid
            // so it is safe to ask this here (issue #490)

            // only delete currentTarget if no actions were scheduled during the cycle (issue #481)
            if (this._currentTargetSalvaged && this._currentTarget.actions.length == 0) {
                this._deleteHashElement(this._currentTarget);
            }
        }
    }