function(child) {
        if(child && child.index !== undefined && this.children[child.index]._id == child._id) {
            var stage = this.getStage();
            if(stage !== undefined) {
                stage._removeId(child);
                stage._removeName(child);
            }

            var go = Kinetic.Global;
            for(var n = 0; n < go.tempNodes.length; n++) {
                var node = go.tempNodes[n];
                if(node._id === child._id) {
                    go.tempNodes.splice(n, 1);
                    break;
                }
            }

            this.children.splice(child.index, 1);
            this._setChildrenIndices();

            // remove children
            if(child.children) {
                for(var n = 0; n < child.children.length; n++) {
                    child.remove(child.children[n]);
                }
            }

            // do extra stuff if needed
            if(this._remove !== undefined) {
                this._remove(child);
            }
        }

        // chainable
        return this;
    }