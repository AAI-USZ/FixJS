function() {
        ids = new Array();
        Commenting.elements = [];
        jQuery('input.batch-select-comment:checked').each(function() {
            var target = jQuery(this.parentNode.parentNode);
            ids[ids.length] = target.attr('id').substring(8);
            Commenting.elements[Commenting.elements.length] = target; 
        });
        json = {'ids': ids, 'approved': 0};
        jQuery.post(Commenting.pluginRoot + "updateapproved", json, Commenting.unapproveResponseHandler);
    }