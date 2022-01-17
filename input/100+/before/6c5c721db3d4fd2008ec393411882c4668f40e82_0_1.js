function (objectId) {
        //self or child updated
        var updatedObject = this._client.getNode(objectId),
            oldChildren,
            newChildren,
            childrenDiff,
            i,
            childId;

        //check if the updated object is the opened node
        if (objectId === this._currentNodeInfo.id) {
            //the updated object is the parent whose children are displayed here
            //the interest about the parent is:
            // - name change
            // - new children
            // - deleted children

            this._modelEditorView.updateCanvas(this._getObjectDescriptor(updatedObject));

            //save old and current children info to be able to see the difference
            oldChildren = this._currentNodeInfo.children.splice(0);
            newChildren = updatedObject.getChildrenIds() || [];

            //Handle children deletion
            childrenDiff = util.arrayMinus(oldChildren, newChildren);

            for (i = 0; i < childrenDiff.length; i += 1) {
                childId = childrenDiff[i];
                this._modelEditorView.deleteComponent(this._components[childId].componentInstance);
                delete this._components[childId];
            }

            //Handle children addition
            childrenDiff = util.arrayMinus(newChildren, oldChildren);
            for (i = 0; i < childrenDiff.length; i += 1) {
                childId = childrenDiff[i];

                //assume that the child is not yet loaded on the client
                this._components[childId] = {   "componentInstance": null,
                    "state" : this._componentStates.loading };

                this._createObject(childId);
            }

            //finally store the actual children info for the parent
            this._currentNodeInfo.children = newChildren;

        } else if (this._components[objectId]) {
            //one of the children of the opened node has been updated
            if (this._components[objectId].state === this._componentStates.loaded) {
                this._modelEditorView.updateComponent(this._components[objectId].componentInstance,
                                                        this._getObjectDescriptor(updatedObject));
            }
        }
    }