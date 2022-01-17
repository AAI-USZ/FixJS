function () {
        var cookies,
            length,
            cookie,
            i;

        $('#error').html('');
        try {
            cookies = JSON.parse($("#cookie").val());
        } catch(e) {
            $('#error').html('<div class="alert alert-error">' + e + '</div>');
            return;
        }

        length  = cookies.length;
        for (i = 0; i < length; i += 1) {
            cookie = cookies[i];
            cookie.url = "http" + (cookie.secure ? 's' : '')
                + '://' + cookie.domain + cookie.path;
            delete cookie.hostOnly;
            delete cookie.session;
            chrome.cookies.set(cookie);
        }
        $("#result").html("Finished setting cookies.")
            .show().fadeOut(5 * 1000);
    }