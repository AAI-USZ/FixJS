function(id, should_show, rows){
                    if( should_show ){
                        $('#child_list_' + id).show();
                        $('#child_header_list_' + id).show();
                    } else {
                        $('#child_list_' + id).hide();
                        $('#child_header_list_' + id).hide();
                    }
                }