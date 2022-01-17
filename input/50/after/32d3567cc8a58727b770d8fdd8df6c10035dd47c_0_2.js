function(ev, ui) {
                    this.close();
                    // if returning to a tab, need to trigger layout to resize
                    jQuery('body').trigger('layoutresizeall');
                 }