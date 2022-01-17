function () {
    var vars = getUrlVars();
    var $domain = $("#domain");

    if (typeof vars['domain'] !== 'undefined') {
        $domain.val(vars['domain']);
        getCookie(vars['domain']);
    }
    $("#edit-page").click(function () {
        linkTo('edit.html');
    });
    $("#set-page").click(function () {
        linkTo('set.html');
    });

    $('#get').click(function () {
        clearAndGetCookie($domain.val());
    });
    $domain.keypress(function (event) {
        var enter_key = 13;
        if (event.which === enter_key) {
            clearAndGetCookie($domain.val());
        }
    });

    function clearAndGetCookie(domain) {
        $("#information").removeClass("alert-info alert-error").html("");
        $('#cookie').val("");
        getCookie(domain);
    }

    function getCookie(domain) {
        chrome.cookies.getAll({}, function (cookies) {
            var length, i, regexp, result = [], stringified;
            length = cookies.length;
            try {
                regexp = new RegExp(domain);
            }
            catch (e) {
                $("#information").addClass("alert-error").text(e + "");
                return;
            }
            for (i = 0; i < length; i += 1) {
                if (cookies[i].domain.match(regexp)) {
                    result.push(cookies[i]);
                }
            }
            displayCookie(result);
        });
    }

    function displayCookie(cookies) {
        var count_message,
            stringified_cookies;

        if (cookies.length === 0) {
            $("#cookie").val('No cookie!');
            return;
        }
        else {
            count_message = "You've got " + cookies.length + " cookie"
                + (cookies.length === 1 ? '' : 's') + ".";
        }
        stringified_cookies = JSON.stringify(cookies.sort(cookieSort), null, ' ');
        $("#information").addClass("alert-info").html(count_message);
        $('#cookie').val(stringified_cookies);
    }
}