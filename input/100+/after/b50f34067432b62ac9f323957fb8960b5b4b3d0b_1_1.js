function() {
    var html = '', i, sheet, sheets, llevels;

    // Stylesheet selection dropdown
    sheet = WebUtil.selectStylesheet();
    sheets = WebUtil.getStylesheets();
    for (i = 0; i < sheets.length; i += 1) {
        UI.addOption($D('noVNC_stylesheet'),sheets[i].title, sheets[i].title);
    }

    // Logging selection dropdown
    llevels = ['error', 'warn', 'info', 'debug'];
    for (i = 0; i < llevels.length; i += 1) {
        UI.addOption($D('noVNC_logging'),llevels[i], llevels[i]);
    }

    // Settings with immediate effects
    UI.initSetting('logging', 'warn');
    WebUtil.init_logging(UI.getSetting('logging'));

    UI.initSetting('stylesheet', 'default');
    WebUtil.selectStylesheet(null);
    // call twice to get around webkit bug
    WebUtil.selectStylesheet(UI.getSetting('stylesheet'));

    /* Populate the controls if defaults are provided in the URL */
    UI.initSetting('host', window.location.hostname);
    UI.initSetting('port', window.location.port);
    UI.initSetting('password', '');
    UI.initSetting('encrypt', (window.location.protocol === "https:"));
    UI.initSetting('true_color', true);
    UI.initSetting('cursor', false);
    UI.initSetting('shared', true);
    UI.initSetting('view_only', false);
    UI.initSetting('connectTimeout', 2);
    UI.initSetting('path', 'websockify');
    UI.initSetting('repeaterID', '');

    UI.rfb = RFB({'target': $D('noVNC_canvas'),
                  'onUpdateState': UI.updateState,
                  'onClipboard': UI.clipReceive});
    UI.updateVisualState();

    // Unfocus clipboard when over the VNC area
    //$D('VNC_screen').onmousemove = function () {
    //         var keyboard = UI.rfb.get_keyboard();
    //        if ((! keyboard) || (! keyboard.get_focused())) {
    //            $D('VNC_clipboard_text').blur();
    //         }
    //    };

    // Show mouse selector buttons on touch screen devices
    if ('ontouchstart' in document.documentElement) {
        // Show mobile buttons
        $D('noVNC_mobile_buttons').style.display = "inline";
        UI.setMouseButton();
        // Remove the address bar
        setTimeout(function() { window.scrollTo(0, 1); }, 100);
        UI.forceSetting('clip', true);
        $D('noVNC_clip').disabled = true;
    } else {
        UI.initSetting('clip', false);
    }

    //iOS Safari does not support CSS position:fixed.
    //This detects iOS devices and enables javascript workaround.
    if ((navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i))) {
        //UI.setOnscroll();
        //UI.setResize();
    }

    $D('noVNC_host').focus();

    UI.setViewClip();
    Util.addEvent(window, 'resize', UI.setViewClip);

    Util.addEvent(window, 'beforeunload', function () {
        if (UI.rfb_state === 'normal') {
            return "You are currently connected.";
        }
    } );

    // Show description by default when hosted at for kanaka.github.com
    if (location.host === "kanaka.github.com") {
        // Open the description dialog
        $D('noVNC_description').style.display = "block";
    } else {
        // Open the connect panel on first load
        UI.toggleConnectPanel();
    }
}