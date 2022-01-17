function () {
    var me = this;
    $('#kml-preview').load(function() {
        // only continue if the users mouse is still on the element
        // for which the preview is shown
        if ($(this).attr('src') == me.previewImageUrl) {
            $('#kml-preview-container').show();
        }
    });
}