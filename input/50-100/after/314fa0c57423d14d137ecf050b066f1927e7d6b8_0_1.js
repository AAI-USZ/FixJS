function( event, ui ) {
                        ui.item.option.selected = true;
                        self._trigger( "selected", event, {
                            item: ui.item.option
                        });
                        $(self.element).trigger( "autocomplete-selected", event, {
                            item: ui.item.option
                        });
                    }