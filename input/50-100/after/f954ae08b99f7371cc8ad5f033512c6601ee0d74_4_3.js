function isExpanded(treeAddress) {
    if (debug) console.log('treeAddress, getExpanded()[treeAddress]', treeAddress, getExpanded()[treeAddress]);

    if (!treeAddress) return false;

    var isExpanded = getExpanded()[treeAddress] == true ? true : false;

    if (debug) console.log(isExpanded);

    return isExpanded;
}