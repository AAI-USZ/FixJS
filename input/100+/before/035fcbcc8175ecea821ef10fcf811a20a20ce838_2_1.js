function  (win, doc) {
        _win = win;
        _doc = doc;
        _xhr = win.XMLHttpRequest;

        require('ripple/widgetConfig').initialize();

        var marshal = function (obj, key) {
                window[key] = win[key] = obj;
            },
            sandbox = {};

        marshal(window.tinyHippos, "tinyHippos");
        marshal(window.XMLHttpRequest, "XMLHttpRequest");

        platform.current().initialize(win);

        builder.build(platform.current().objects).into(sandbox);
        utils.forEach(sandbox, marshal);

        _marshalScreen(win);
        _marshalScreen(window);
    }