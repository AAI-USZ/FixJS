function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $(this).closest('form').submit();
            return false;
        } else {
            return true;
        }
    }