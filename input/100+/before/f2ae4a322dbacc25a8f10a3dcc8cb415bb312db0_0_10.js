function(id, should_show, rows){
                    var child_rows = rows.get_children(id);                    

                    KT.utils.each(child_rows, function(child){
                        child = KT.common.escapeId(child);
                        if( should_show ){
                            $('#grid_row_' + child).show();
                            $('#row_header_' + child).show();
                        } else {
                            $('#grid_row_' + child).hide();
                            $('#row_header_' + child).hide();
                        }
                    });

                    if( rows.get_children(child_rows[0]) !== undefined ){
                        show(child_rows[0], should_show, rows);
                    }
                }