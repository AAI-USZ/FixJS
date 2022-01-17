function () {
    var vars = getUrlVars();
    var $domain = $("#domain");

    if (typeof vars['domain'] !== 'undefined') {
        console.log(vars['domain']);
        $domain.val(vars['domain']);
        getCookie(vars['domain']);
    }

    $("#get-page").click(function () {
        linkTo('get.html');
    });
    $("#set-page").click(function () {
        linkTo('set.html');
    });
    $('#get').click(clearAndGetCookie);
    $domain.keypress(function (event) {
        var enter_key = 13;
        if (event.which === enter_key) {
            clearAndGetCookie();
        }
    });

    function clearAndGetCookie() {
        $("#table").text('');
        $("#information").removeClass("alert-error alert-success").text("").hide();
        $("#cookie").remove();
        getCookie($domain.val());
    }

    function getCookie(domain) {
        chrome.cookies.getAll({}, function (all_cookies) {
            var length, i, e, regexp, cookies = [];
            try {
                regexp = new RegExp(domain);
            }
            catch (e) {
                $("#information").addClass("alert-error").text(e + "").show();
                return;
            }

            length = all_cookies.length;
            for (i = 0; i < length; i += 1) {
                if (all_cookies[i].domain.match(regexp)) {
                    cookies.push( all_cookies[i] );
                }
            }
            displayCookie(cookies);
        });
    }

    function displayCookie(cookies) {
        var lenght, i;
        var table = $(
            '<table id="cookie" class="table table-bordered"></table>'
        ).append(
            '<thead>'
            + '<tr>'
            + '<th class="delete"></th>'
            + '<th class="domain">domain</th>'
            + '<th class="path">path</th>'
            + '<th class="name">name</th>'
            + '<th class="expr">expr</th>'
            + '<th class="hostOnly">host<br>Only</th>'
            + '<th class="httpOnly">http<br>Only</th>'
            + '<th class="secure">secure</th>'
            + '<th class="session">session</th>'
            + '<th class="storeId">store<br>Id</th>'
            + '<th class="value">value</th>'
            + '</tr>'
            + '</thead>'
        );
        length = cookies.length;
        if (length === 0) {
            $("#table").text("No cookie matched.");
            return;
        }
        cookies.sort(cookieSort);

        if (length > 1000) {
            $("#information").addClass("alert-success").text(
                "You have got " + length + " cookies, but display only 1000 cookies."
            ).show();
            length = 1000;
        }
        else {
            $("#information").addClass("alert-success").text(
                "You have got " + length + " cookie"
                    + (cookies.length === 1 ? '' : 's') + "."
            ).show();
        }
        for (i = 0; i < length; i += 1) {
            table.append(tr(i));
            table.find('#remove' + i).click(remove(i));
            table.find('#edit' + i).click(edit(i));
        }
        table.find("tr:odd").addClass("odd");
        table.appendTo("#table");

        function tr(i) {
            var cookie = cookies[i];
            return '<tr id="cookie' + i + '">'
                + '<td class="delete"><button class="close" id="remove' + i + '">&times;</button></td>'
                + '<td class="domain">' + cookie.domain + '</td>'
                + '<td class="path">' + cookie.path + '</td>'
                + '<td class="name">' + cookie.name + '</td>'
                + '<td class="expirationDate">' + (cookie.expirationDate + "").substring(0,10) + '</td>'
                + '<td class="hostOnly">' + check(cookie.hostOnly) + '</td>'
                + '<td class="httpOnly">' + check(cookie.httpOnly) + '</td>'
                + '<td class="secure">' + check(cookie.secure) + '</td>'
                + '<td class="session">' + check(cookie.session) + '</td>'
                + '<td class="storeId">' + cookie.storeId + '</td>'
                + '<td class="value" style="white-space: nowrap;">'
                + '<div class="input-append">'
                + '<input class="input-value" type="text" value="'
                + htmlEscape(cookie.value)
                + '">'
                + '<button class="btn" id="edit' + i + '">save</button></td>'
                + '</div>'
                + '</tr>';
        }
        function htmlEscape(string) {
            return string.replace(/&/g, '&amp;')
                         .replace(/"/g, '&quot;')
                         .replace(/</g, '&lt;');
        }
        function check(bool) {
            return bool ? '✔' : '';
        }

        function remove(i) {
            var cookie = cookies[i];
            return function () {
                chrome.cookies.remove({
                    url: "http" + (cookie.secure ? 's' : '') + '://'
                        + cookie.domain + cookie.path,
                    name: cookie.name,
                    storeId: cookie.storeId
                });
                $("#cookie" + i).fadeOut(300, function () {
                    $(this).remove();
                    table.find("tr").removeClass("odd")
                        .filter(":odd").addClass("odd");
                });
            };
        };

        function edit(i) {
            return function () {
                var cookie = cookies[i];

                chrome.cookies.set({
                    url: "http" + (cookie.secure ? 's' : '') + '://'
                        + cookie.domain + cookie.path,
                    name: cookie.name,
                    value: $("#cookie" + i + ' .value input').val(),
                    domain: cookie.domain,
                    path: cookie.path,
                    secure: cookie.secure,
                    httpOnly: cookie.httpOnly,
                    expirationDate: cookie.expirationDate,
                    storeId: cookie.storeId
                });
                $('<div class="alert alert-success">Saved the value.</div>')
                    .css('position', 'fixed')
                    .css('right', 0)
                    .css('left', 0)
                    .css('text-align', 'center')
                    .css('top', 0)
                    .css('padding', '50px 0 10px 0')
                    .css('z-index', 100)
                    .appendTo('body')
                    .delay(2000)
                    .fadeOut(1000);
            };
        };
    }
}