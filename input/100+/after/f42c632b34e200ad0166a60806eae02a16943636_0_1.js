function (event) {
        event.preventDefault();
        var removeButton = jQuery(this);

        // Don't delete the last input block for an element.
        if (removeButton.parents(fieldSelector).find(inputBlockSelector).length === 1) {
            return;
        }

        if (!confirm('Do you want to delete this input?')) {
            return;
        }

        var inputBlock = removeButton.parents(inputBlockSelector);
        inputBlock.find('textarea').each(function () {
            tinyMCE.execCommand('mceRemoveControl', false, this.id);
        });
        inputBlock.remove();

        // Hide remove buttons for fields with one input.
        jQuery(fieldSelector).each(function () {
            var removeButtons = jQuery(this).find(removeSelector);
            if (removeButtons.length === 1) {
                removeButtons.hide();
            }
        });
    }