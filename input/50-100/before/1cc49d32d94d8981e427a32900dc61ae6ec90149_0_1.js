function () {
                    /** Refresh the search results after the deletion */
                    document.getElementById('buttonGo').click();
                    $('#togglequerybox').html(PMA_messages['strHideQueryBox']);
                    PMA_ajaxRemoveMessage($msg);
                    /** Show the results of the deletion option */
                    $('#browse-results').show();
                    $('#sqlqueryform').show();
                    $('#togglequerybox').show();
                }