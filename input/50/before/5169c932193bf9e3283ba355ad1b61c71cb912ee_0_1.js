function(node) {
        if(node.attrs.id !== undefined) {
            this.ids[node.attrs.id] = undefined;
        }
    }