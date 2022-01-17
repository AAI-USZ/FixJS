function(obj){
            console.log("Remot move %d[%d] = %d   -> %d[%d] %s", obj.value.prevParentID,
                    obj.value.prevPos, obj.value.targetID, obj.value.newParentID, obj.value.newPos,obj.type);
            if(obj.type == 'delete'){
                // Get parent item's children
                var prevParent = this._getItemById(obj.value.prevParentID);
                if (!prevParent) {
                    return;
                }
                var children = prevParent.children;
                // Remove target item from children
                children = children.slice(0);
                children.splice(obj.position, 1);
                if (obj.position != obj.value.prevPos)
                    console.log("delete positions changed");
                // Update store & save
                this.store.setValue(prevParent,'children',children);
                this.store.save();
            }else if(obj.type == 'insert'){
                // Get parent item's children
                var newItem = this._getItemById(obj.value.targetID);
                var newParent = this._getItemById(obj.value.newParentID);
                if (!newItem || !newParent) {
                    return;
                }
                var children = newParent.children;
                // Add target item to children in proper pos
                if(children == undefined)
                    children = [];
                else {
                    children = children.slice(0);
                    children.splice(obj.position, 0, newItem);
                }
                if (obj.position != obj.value.newPos)
                    console.log("insert positions changed");
                if (!this.validate(children)) {
                    console.log("Children subforest not valid.");
                }
                // Update store & save
                this.store.setValue(newParent,'children',children);
                this.store.save();
            }
        }