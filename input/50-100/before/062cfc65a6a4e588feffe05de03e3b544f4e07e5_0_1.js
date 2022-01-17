function checkFillBlanksReason(select, selectID){
    if(selectID.toLowerCase() === select.val()){
        var parent = $(select.parent());
        select.remove();
        parent.append(selectID);
        return true;
    }
    return false;
}