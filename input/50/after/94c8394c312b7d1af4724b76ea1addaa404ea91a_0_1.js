function(node, callback){
    if(node.self) {
        node.id = node.self.replace(this.removeCredentials(this.url) + '/db/data/node/', '');
    }
    callback(null, node);
}