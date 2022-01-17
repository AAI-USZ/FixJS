function () {
                    /** Refresh the search results after the deletion */
                    document.getElementById('buttonGo').click();
                    $('#togglequerybox').html(PMA_messages['strHideQueryBox']);
                    /** Show the results of the deletion option */
                    $('#browse-results').show();
                    $('#sqlqueryform').show();
                    $('#togglequerybox').show();
                    $('html, body')
                        .animate({
                            scrollTop: $("#browse-results").offset().top
                        }, 1000);
                    PMA_ajaxRemoveMessage($msg);
                }