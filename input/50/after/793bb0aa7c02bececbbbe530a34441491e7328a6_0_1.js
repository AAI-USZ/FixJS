function (element) {
    jQuery(element).find('div.inputs input[type="checkbox"]').each(function () {
        Omeka.Items.enableWysiwygCheckbox(this);
    });
}