function(node) {
        if(node.attrs.id !== undefined) {
            delete this.ids[node.attrs.id];
        }
    }