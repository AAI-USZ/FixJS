function (booted) {
            // techdebt (event registration timing)
            require('ripple/platform/webworks.core/2.0.0/fsCache');

            window.addEventListener("keydown", function (event) {
                var hasMetaOrAltPressed = (event.metaKey || event.ctrlKey),
                    key = parseInt(event.keyCode, 10);

                if (key === 37 && hasMetaOrAltPressed) { // cmd/ctrl + left arrow
                    event.preventDefault();
                    emulatorBridge.window().history.back();
                }

                if (key === 39 && hasMetaOrAltPressed) { // cmd/ctrl + right arrow
                    event.preventDefault();
                    emulatorBridge.window().history.forward();
                }

                if (key === 82 && hasMetaOrAltPressed) { // cmd/ctrl + r
                    event.preventDefault();
                    window.tinyHipposReload = true;
                    emulatorBridge.window().location.reload();
                }

                if (key === 116) { // F5
                    event.preventDefault();
                    window.tinyHipposReload = true;
                    emulatorBridge.window().location.reload();
                }
            });

            window.onbeforeunload = function () { 
                if (!window.tinyHipposReload) {
                    return "Are you sure you want to exit Ripple?";
                }
            };

            //HACK: need to find a better way to do this since it's
            //WebWorks specific!!!
            window.onunload = function () {
                var bus = require('ripple/bus');
                bus.ajax(
                    "GET",
                    "http://127.0.0.1:9910/ripple/shutdown",
                    null,
                    null,
                    null
                );
            };

            jWorkflow.order(omgwtf.initialize, omgwtf)
                 .andThen(appcache.initialize, appcache)
                 .andThen(db.initialize, db)
                 .andThen(xhr.initialize, xhr)
                 .andThen(geo.initialize, geo)
                 .andThen(fs.initialize, fs)
                 .andThen(platform.initialize, platform)
                 .andThen(devices.initialize, devices)
                 .andThen(widgetConfig.initialize, widgetConfig)
                 .andThen(deviceSettings.initialize, deviceSettings)
                 .andThen(ui.initialize, ui)
                 .start(booted);
        }