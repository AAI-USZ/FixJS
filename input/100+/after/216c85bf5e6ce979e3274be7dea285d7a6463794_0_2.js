function(e){
    var next;
    if (e.keyCode == 40) {
        next = current_row.parentNode.parentNode.rows[current_row.rowIndex+1];
        if (next == undefined)
            return;
        else{
            select_record(next);
            return false;
        }
    }
    if (e.keyCode == 38) {
        next = current_row.parentNode.parentNode.rows[current_row.rowIndex-1];
        if (next == undefined)
            return;
        else{
			if(next.cells[0].tagName != "TH"){
				select_record(next);
				return false;
			}
        }
    }
    if (current_row != undefined && (e.keyCode == 46 || e.keyCode == 110)) {
        onRemoveButtonClick();
        return false;
    }
    if (current_row != undefined && (e.keyCode == 13 )) {
        onEditButtonClick();
        return false;
    }

}