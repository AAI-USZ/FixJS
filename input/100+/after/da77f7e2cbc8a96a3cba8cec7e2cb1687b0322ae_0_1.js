function insertCustomFieldEntry(obj_name, obj_class, obj_id, obj_permalink, blog_id, el_id) {
    var obj_ids = jQuery('#'+el_id).val();
    var is_mult = jQuery('#'+el_id+'_preview').hasClass('multiple');

    // Check if the field is sortable (allows multiple objects, or has the
    // inactive area) and make the new object work the same way.
    var sortable = '';

    if ( jQuery('#'+el_id+'_inactive').length ) {
        sortable = ' sortable';
    }

    // The ID of this object is saved to a hidden field to track all active
    // and inactive objects in use. We need to consider if any other objects
    // use this field yet, and also whether multiple objects are allowed.
    var split_result = obj_ids.split(';');
    var active       = split_result[0];
    var inactive     = split_result[1] || '';

    if (is_mult) {
        // Multiple objects area allowed in this field. If the `active`
        // keyword was not used yet, add it.
        if (active) {
            active += ',' + obj_id;
        }
        else {
            active = 'active:' + obj_id;
        }
        // If multiple objects are allowed, this is sortable.
        sortable = ' sortable';
    } else {
        // Only one object is allowed to be active.
        active = 'active:' + obj_id;
    }

    obj_ids = active + ';' + inactive;
    jQuery('#'+el_id).val( obj_ids );

    try {
        // Build the list item.
        var html = '<li id="obj-' + obj_id
            + '" class="obj-type obj-type-' + obj_class + sortable
            + '"><span class="obj-title">' + obj_name
            + '</span>'
            // Edit button
            + '<a href="'+ CMSScriptURI + '?__mode=view&amp;_type='
            + obj_class + '&amp;id=' + obj_id + '&amp;blog_id='
            + blog_id + '" target="_blank"'
            + ' title="Edit in a new window.">'
            + '<img src="' + StaticURI
            + 'images/status_icons/draft.gif" width="9" height="9"'
            + ' alt="Edit" />'
            + '</a> '
            // View button
            + '<a href="' + obj_permalink + '" target="_blank"'
            + ' title="View in a new window.">'
            + '<img src="' + StaticURI
            + 'images/status_icons/view.gif" width="13" height="9"'
            + ' alt="View" />'
            + '</a> '
            // The remove button
            + '<a href="javascript:void(0);" onclick="removeCustomFieldEntry(\'' 
            + el_id + "'," + obj_id
            + ')" title="Remove this ' + obj_class + '"><img src="'
            + StaticURI + 'images/status_icons/close.gif" '
            + ' width="9" height="9" alt="Remove" /></a>'
            // Close the list item.
            + '</li>';

        if ( is_mult ) {
          jQuery('#'+el_id+'_preview').append(html);
        } else {
          jQuery('#'+el_id+'_preview').html(html);
        }
    } catch(e) {
        log.error(e);
    };
}