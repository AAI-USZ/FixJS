function checkboxFormatter(cellvalue, options, rowObject) {
    cellvalue = cellvalue + "";
    cellvalue = cellvalue.toLowerCase();
    var bchk = cellvalue.search(/(false|0|no|off|n)/i) < 0 ? " checked=\"checked\"" : "";
    /* Adding a name and the shared user id to the checkbox here with the format check_rowId_shared_uid
     * so that in the ajax save function we get the currect selected value instead of the one
     * provided by custom formatter so that the user can toggle on a single checkbox and still
     * the values are stored at the database. The only thing that can be unique accross the
     * share panel is the row id and share user id
     * */
    return "<input type='checkbox' name='check_"+options.rowId+"_"+rowObject[4]+"' id='check_"+options.rowId+"_"+rowObject[4]+"' onclick=\"ajaxSave('" + options.rowId + "','" + rowObject[4] +"');\" " + bchk + " value='" + cellvalue + "' offval='no' />"
}