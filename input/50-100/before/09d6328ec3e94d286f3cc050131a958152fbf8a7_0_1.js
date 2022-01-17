function() {
        var check_text = $('#corrected_text').val().toLowerCase();
        if (check_text.indexOf("btb") != -1 || check_text.indexOf("comm") != -1 || check_text.indexOf("prod") != -1) {
            $('#submit_warning').fadeIn()
        } else{
            submit_correction();
        }
    }