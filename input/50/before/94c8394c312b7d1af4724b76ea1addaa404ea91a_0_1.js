function(node, callback){
    node.id = node.self.replace(this.removeCredentials(this.url) + '/db/data/node/', '');
    callback(null, node);
}