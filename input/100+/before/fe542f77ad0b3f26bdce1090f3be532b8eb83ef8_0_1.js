function () {
    var attrs,
        selected_node = this.editor.selection.getNode(),
        href = this.current_link,
        dimension,
        classes;

    // if we have absolute url, make sure it's relative
    if (href.indexOf('resolveuid/') > -1) {
        href = 'resolveuid/' + href.split('resolveuid/')[1];
    }

    this.tinyMCEPopup.restoreSelection();

    // Fixes crash in Safari
    if (tinymce.isWebKit) {
        this.editor.getWin().focus();
    }

    // Append the image scale to the URL if a valid selection exists.
    dimension = jq('#dimensions', document).val();
    if (dimension !== "") {
        href += '/' + dimension;
    }

    // Pass-through classes
    classes = [].concat(this.current_classes);
    // Alignment class
    classes.push(jq.trim(jq('#classes', document).val()));
    // Image captioning
    if (this.editor.settings.allow_captioned_images && jq('#caption', document).is(':checked')) {
        classes.push('captioned');
    }

    attrs = {
        'src' : href,
        'class' : classes.join(' ')
    };

    if (selected_node && selected_node.nodeName.toUpperCase() === 'IMG') {
        // Update an existing <img/> element
        this.editor.dom.setAttribs(selected_node, attrs);
    } else {
        // Create a new <img/> element.
        this.editor.execCommand('mceInsertContent', false, '<img id="__mce_tmp" />', {skip_undo : 1});
        this.editor.dom.setAttribs('__mce_tmp', attrs);
        this.editor.dom.setAttrib('__mce_tmp', 'id', '');
        this.editor.undoManager.add();
    }

    // Update the Description of the image
    jq.ajax({
        'url': jq('#description_href', document).val() + '/tinymce-setDescription',
        'type': 'POST',
        'data': {
            'description': encodeURIComponent(jq('#description', document).val())
        }
    });

    this.tinyMCEPopup.close();
}