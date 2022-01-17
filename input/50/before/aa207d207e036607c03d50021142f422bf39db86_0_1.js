function(data) {
            // The sync event tells us to delete a node from its parent.
            var toDelete = this.domTree_map[data.value.id].children[data.position];
            EditorTree.applyDel(toDelete);
            delete this.domTree_map[toDelete.id];
        }