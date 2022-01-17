function(data) {
            var value = data.value;
            var newNode = EditorTree.applyIns(value.x, this.domTree_map[value.parentId], data.position, value.newId);
            this.domTree_map[value.newId] = newNode;
        }