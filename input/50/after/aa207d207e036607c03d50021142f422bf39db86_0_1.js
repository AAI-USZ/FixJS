function(data) {
            // The sync event tells us to delete a node from its parent.
            var toDelete = this.domTree_map[data.value.oldParent].children[data.position];
            EditorTree.applyDel(toDelete, data.position);
            delete this.domTree_map[toDelete.id];
        }