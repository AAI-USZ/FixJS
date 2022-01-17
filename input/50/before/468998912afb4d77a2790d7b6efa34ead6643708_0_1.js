function(data) {
                $("#sqlqueryresults")
                 .html(data)
                 .trigger('makegrid');
                PMA_init_slider();

                PMA_ajaxRemoveMessage($msgbox);
            }