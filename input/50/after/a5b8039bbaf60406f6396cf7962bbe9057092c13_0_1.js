function(data) {
                $("#sqlqueryresults")
                 .html(data.sql_query ? data.sql_query : data)
                 .trigger('makegrid');
                PMA_init_slider();

                PMA_ajaxRemoveMessage($msgbox);
            }