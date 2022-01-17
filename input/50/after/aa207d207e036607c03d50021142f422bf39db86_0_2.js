function(data) {
            var node = this.domTree_map[data.value.pid].children[data.position];
            EditorTree.applyUpd(node, data.value.val);
        }