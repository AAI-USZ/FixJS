function(nodeId, item) {
    return iq({type: 'get'}, exports.ownerNS).
        c('affiliations', {node: nodeId}).
        root();
}