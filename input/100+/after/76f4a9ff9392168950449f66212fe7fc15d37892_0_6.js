function checkFillBlanksReason(select, selectID) {
    if (verifyStatementArgs(selectID.split(",")[0].substring(8,11) + "=" + selectID.split(",")[1].substring(8,11), select.val(), "triangle congruence") === true
        || verifyStatementArgs(selectID.split(",")[0].substring(5,8) + "=" + selectID.split(",")[1].substring(5,8), select.val(), "angle equality") === true
        || verifyStatementArgs(selectID.split(",")[0].substring(3,5) + "=" + selectID.split(",")[1].substring(3,5), select.val(), "segment equality") === true) {
        var parent = $(select.parent());
        select.remove();
        parent.append(select.val());
        return true;
    }
    return false;
}