function removeExpandedNode(treeAddress) {
    if (debug) console.log('removeExpandedNode', treeAddress);

    if (!treeAddress) return;
    
    delete getExpanded()[treeAddress];
    $.cookie('structrTreeExpandedIds', $.toJSON(Structr.expanded), {
        expires: 7, 
        path: '/'
    });
}