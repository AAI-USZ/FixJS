function(event, ui){
                    trackOffsets('change:  ',ui,$(this).data('sortable'));

                    // Workaround a jQuery UI's bug which sometimes rearranges
                    // the placeholder to a container without changing
                    // the currentContainer, which leads to placeholder
                    // jittering
                    $(this).data('sortable').currentContainer
                        = ui.placeholder.closest('.nrc-sortable-container')
                                        .data('sortable');
                    adjustMargins(ui.placeholder);
                }