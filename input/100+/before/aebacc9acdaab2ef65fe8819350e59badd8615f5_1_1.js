function(id, retainNode) {
            var slot, doomed, children = this.getChildren(), child = children[id];

            if (child) {
                doomed = child.viewId;

            } else {
                //child key could be a random YUI Id
                for (slot in children) {
                    if (children.hasOwnProperty(slot) && children[slot].viewId === id) {
                        doomed = id;
                    }
                }
            }
            if (!doomed) {
                throw new Error("Cannot destroy a child mojit with id '" +
                    id + "'. Are you sure this is your child?");
            }

            this._client.destroyMojitProxy(doomed, retainNode);

            if (child) {
                if (this.config.children) {
                    delete this.config.children[id];
                }
                delete children[id];
            }
        }