function (ev) {
        if (!isAuthenticated) {
            // TODO: request status from server
            ev.stopPropagation();
            ev.stopImmediatePropagation();
            ev.preventDefault();
            var url = $(this).attr("href");
            if (url == "/vote/add/") {
                url = document.location.pathname;
            } else if (url.charAt(0) == "#") {
                url = document.location.pathname + url;
            }
            $("#login-box #login-button").attr("href", "/user/login?next=" + encodeURIComponent(url));
            $("#login-box").dialog({
                width: 850,
                modal: true,
                resizable: false,
                draggable: false
            });
            return false;
        }
    }