function makeSelectOptions(dataTable,
                           option_value_col,
                           option_name_col,
                           status_cols,
                           bad_status_values,
                           no_empty_opt){
    var nodes = dataTable.fnGetData();
    var select = "";
    if (!no_empty_opt)
        select = '<option class="empty_value" value="">'+tr("Please select")+'</option>';
    var array;
    for (var j=0; j<nodes.length;j++){
        var elem = nodes[j];
        var value = elem[option_value_col];

        //ASSUMPTION: elem id in column 1
        var id = elem[1];
            
        var name = elem[option_name_col];
        var status, bad_status;
        var ok=true;
        for (var i=0;i<status_cols.length;i++){
            status = elem[status_cols[i]];
            bad_status = bad_status_values[i];
            //if the column has a bad value, we
            //will skip this item
            if (status == bad_status){
                ok=false;
                break;
            };
        };
        if (ok){
            select +='<option elem_id="'+id+'" value="'+value+'">'+name+' (id:'+id+')</option>';
        };
    };
    return select;
}