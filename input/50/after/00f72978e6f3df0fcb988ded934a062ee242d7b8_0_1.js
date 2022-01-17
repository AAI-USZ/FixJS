function(parent_id)
    {
        if (parent_id > 0) {
            jQuery('#comment-editor-' + parent_id).remove();
        }
        else {
            jQuery('#jform_description_' + parent_id).val('');
        }

        
    }