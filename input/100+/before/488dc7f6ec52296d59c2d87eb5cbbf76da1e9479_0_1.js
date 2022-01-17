function checkFillBlanksReason(select, selectID) {
    var reasonCodes = {"SSS" : 0, "ASA" : 1, "SAS" : 2, "AAS" : 3, "corresponding parts of congruent triangles are congruent" : 4,
     "vertical angles are equal" : 5, "alternate interior angles are equal" : 6};
    if (selectID === reasonCodes[select.val()]) {
        var parent = $(select.parent());
        select.remove();
        parent.append(selectID);
        return true;
    }
    return false;
}