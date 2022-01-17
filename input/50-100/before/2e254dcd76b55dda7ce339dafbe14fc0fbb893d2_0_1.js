function(result) 
            {
                var finished = parse_realm_status(result, div_id );
                if( finished == '' ) finished = '<center>No Realms Installed</center>';
                $( div_id ).html(finished).show();
                $( loading_id ).hide();
            }