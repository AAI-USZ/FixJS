function(data) {
            var node = this.domTree_map[data.value.id];
            console.log(data);
            EditorTree.applyUpd(node, data.value.val);
        }