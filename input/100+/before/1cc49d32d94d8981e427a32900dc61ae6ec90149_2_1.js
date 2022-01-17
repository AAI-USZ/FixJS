function(data) {
                    if(data.success == true) {
                        PMA_ajaxShowMessage(data.message);
                        if (window.parent && window.parent.frame_navigation) {
                            window.parent.frame_navigation.location.reload();
                        }
                        $('#tableslistcontainer').load('server_databases.php form#dbStatsForm');
                    } else {
                        PMA_ajaxShowMessage(PMA_messages.strErrorProcessingRequest + ": " + data.error, false);
                    }
                }