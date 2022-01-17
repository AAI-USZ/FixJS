function (prev, baton) {
        var omnibar = _omnibar(),
            position, loc, tmp,
            url, filename, matching;

        jQuery(".logo, .beta, .left, .right, .left-panel-collapse, .right-panel-collapse").css({
            "marginTop": "35px"
        });

        jQuery("#settings-xhr-proxy").parent().parent().hide();

        $(".omni-bar").show();

        position = document.documentURI.indexOf("?url=");
        if (position !== -1) {
            url = document.documentURI.substring(position + 5, document.documentURI.length);
            if (url.match(/^\.[\.]?/) !== null) {
                loc = document.location;
                filename = loc.pathname.replace(/^.*[\\\/]/, '')
                matching = new RegExp(filename,"g");
                tmp = loc.protocol + "//" + loc.hostname + loc.pathname.replace(matching, "") + url;
                url = tmp;
            }
            _persist(url);
            _persistRoot(url);
            require('ripple/widgetConfig').initialize();
            require('ripple/ui/plugins/widgetConfig').initialize();
        }

        omnibar.value = _currentURL();

        omnibar.addEventListener("keydown", function (event) {
            if (event.keyCode === '13' || event.keyCode === 13 || event.keyCode === '0' || event.keyCode === 0) { // enter or return
                if (omnibar.value.trim() !== "") {
                    //default the protocal if not provided
                    omnibar.value = omnibar.value.indexOf("://") < 0 ? "http://" + omnibar.value : omnibar.value;
                    _persist(omnibar.value);
                    _persistRoot(omnibar.value);
                    emulatorBridge.window().location.assign(omnibar.value);
                }
            }
        });

        window.addEventListener("keydown", function (event) {
            var hasMetaOrAltPressed = (event.metaKey || event.ctrlKey),
                key = parseInt(event.keyCode, 10);

            if (key === 37 && hasMetaOrAltPressed) { // cmd/ctrl + left arrow
                event.preventDefault();
                _back();
            }

            if (key === 39 && hasMetaOrAltPressed) { // cmd/ctrl + right arrow
                event.preventDefault();
                _forward();
            }

            if (key === 82 && hasMetaOrAltPressed) { // cmd/ctrl + r
                event.preventDefault();
                _reload();
            }

            if (key === 116) { // F5
                event.preventDefault();
                _reload();
            }
        });

        document.getElementById("history-back").addEventListener("click", _back);
        document.getElementById("history-forward").addEventListener("click", _forward);
        document.getElementById("history-reload").addEventListener("click", _reload);
    }