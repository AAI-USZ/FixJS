function() {
                                if ( $( this).text().match( matcher ) ) {
                                    $(input).val($(this).text());
                                    this.selected = valid = true;
                                    return false;
                                }
                            }