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

        removeButton.parents(inputBlockSelector).remove();

        // Hide remove buttons for fields with one input.
        jQuery(fieldSelector).each(function () {
            var removeButtons = jQuery(this).find(removeSelector);
            if (removeButtons.length === 1) {
                removeButtons.hide();
            }
        });
    }