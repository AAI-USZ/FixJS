function initEditAddon() {
    if (z.noEdit) return;

    // Load the edit form.
    $('#edit-addon').delegate('h2 a', 'click', function(e){
        e.preventDefault();

        var a = e.target;
        parent_div = $(a).closest('.edit-addon-section');

        (function(parent_div, a){
            parent_div.find(".item").addClass("loading");
            parent_div.load($(a).attr('data-editurl'), function(){
                if (parent_div.find('#addon-categories-edit').length) {
                    initCatFields();
                }
                $(this).each(addonFormSubmit);
                initInvisibleUploads();
            });
        })(parent_div, a);

        return false;
    });

    // Init icon javascript.
    hideSameSizedIcons();
    initUploadIcon();
    initUploadPreview();
}