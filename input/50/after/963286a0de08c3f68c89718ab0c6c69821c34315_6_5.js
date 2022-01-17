function(data) { 
                    $("#timeSheet").html(data);
                
                    ts_ext_set_TableWidths()
                    ts_ext_applyHoverIntent();
                }