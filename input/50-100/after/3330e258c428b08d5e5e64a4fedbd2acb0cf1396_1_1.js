function(event, ui) {

                    ui.placeholder.css({height: $(ui.helper).outerHeight(true)});

                    $(this).sortable('option', 'connectWith', $(self.options.connectWithSelector).not(ui.item))

                        .sortable('refresh');

                }