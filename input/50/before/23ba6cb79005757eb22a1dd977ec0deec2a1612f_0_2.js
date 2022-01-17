function() {
        // only continue if the users mouse is still on the element
        // for which the preview is shown
        if ($(this).attr('src') == url) {
            $('#kml-preview-container').show();
        }
    }