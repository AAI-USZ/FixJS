function(parent_id)
    {
        if (parent_id > 0) {
            jQuery('#comment-editor-' + parent_id).hide("fast");
        }

        jQuery('#jform_description_' + parent_id).val('');
    }