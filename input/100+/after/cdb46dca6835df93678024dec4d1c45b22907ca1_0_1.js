function(e) {
                    if(e.which&& e.which==13 || e.keyCode && e.keyCode==13)
                    {
                        //same code as change function
                        var matcher = new RegExp( $.ui.autocomplete.escapeRegex($(input).val()), "i" );
                        valid = false;
                        select.children( "option" ).each(function() {
                            if ( $( this ).text().match( matcher ) ) {
                                $(input).val($(this).text());
                                this.selected = valid = true;
                                return false;
                            }
                        });
                        if ( !valid ) {
                            // remove invalid value, as it didn't match anything
                            $( this ).val( "" );
                            select.val( "" );
                            input.data( "autocomplete" ).term = "";
                            $(self.element).trigger("invalid-value", event );

                            return false;
                        }
                    }
                    $(self.element).trigger('keypress',[e]);
                }