function isExpanded(treeAddress) {
    if (debug) console.log('isExpanded', treeAddress);

    if (!treeAddress) return false;

    var isExpanded = getExpanded()[treeAddress] == true ? true : false;

    if (debug) console.log(isExpanded);

    return isExpanded;
}