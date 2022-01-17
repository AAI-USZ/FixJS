function handle409(jqXHR, textStatus, errorThrown) {
        var win = jQuery('<div>You have modified a class that may already have instances in the model. Do you want to continue?</div>')
        jQuery(win).dialog({
            'modal': true,
            'title': 'Overwrite Existing Classes',
            'buttons': {
                'Overwrite': function() {
                    jQuery(this).dialog('close');
                    self.saveFile(true);  // force a save
                },
                'Cancel': function() {
                    jQuery(this).dialog('close');
                }
            }
        });
    }