function adjustPageMargins() {
        if (String(window.location).match(files_url_regex)) {
            $('.hentry').css('margin', '0px 0px 0px auto');
        } else {
            $('.hentry').css('margin', '0px auto');
        }
        $('.hentry').css('width', '60%');
    }