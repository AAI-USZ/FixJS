function() {
        if(ajaxEnable) {
            /**   Hides the results shown by the delete criteria */
            var $msg = PMA_ajaxShowMessage();
            $('#sqlqueryform').hide();
            $('#togglequerybox').hide();
            /**  Load the browse results to the page */
            $("#table-info").show();
            $('#table-link').attr({"href" : 'sql.php?'+link }).text(table_name);
            var url = result_path + " #sqlqueryresults";
            $('#browse-results').load(url, null, function() {
                $('html, body')
                    .animate({
                        scrollTop: $("#browse-results").offset().top
                    }, 1000);
                PMA_ajaxRemoveMessage($msg);
                // because under db_search, window.parent.table is not defined yet,
                // we assign it manually from #table-link
                window.parent.table = $('#table-link').text().trim();
                PMA_makegrid($('#table_results')[0], true, true, true, true);
            }).show();
        } else {
            event.preventDefault();
        }
    }