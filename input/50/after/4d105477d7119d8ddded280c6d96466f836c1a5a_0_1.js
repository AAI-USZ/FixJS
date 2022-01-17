function () {
        $('#main_upload_start').attr('disabled', !((this.checked) && (filestoupload > 0)));
        $("#upload_tooltip").hide();
    }