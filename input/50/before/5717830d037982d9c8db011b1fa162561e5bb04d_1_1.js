function(nodeId, item) {
    return iq({type: 'get'}).
        c('affiliations', {node: nodeId}).
        root();
}