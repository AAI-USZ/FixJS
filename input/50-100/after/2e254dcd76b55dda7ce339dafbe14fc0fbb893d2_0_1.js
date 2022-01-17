function(result) 
            {
                if(result.success == false)
                {
                    if(typeof result.php_error != "undefined" && result.php_error == true && Plexis.debugging == true)
                    {
                        show_php_error(result.php_error_data);
                    }
                }
                else
                {
                    var finished = parse_realm_status(result, div_id );
                    if( finished == '' ) finished = '<center>No Realms Installed</center>';
                    $( div_id ).html(finished).show();
                    $( loading_id ).hide();
                }
            }