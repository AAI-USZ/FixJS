function() {
                                if ( $( this).text().match( matcher ) ) {
                                    $(input).val($(this).text());
                                    $(select).val($(this.text));
                                    this.selected = valid = true;
                                    var option = $(this)
                                    $(self.element).trigger( "autocomplete-selected", event ,{item:option});
                                    return false;
                                }
                            }