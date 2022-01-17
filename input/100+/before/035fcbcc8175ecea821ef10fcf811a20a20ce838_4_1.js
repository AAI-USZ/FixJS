function () {
        // TODO: hackish stub for now
        old_gElById = document.getElementById;
        document.getElementById = function (id) {
            if (id === "viewport-container") {
                return _emulatedViewport;
            }
            else {
                return old_gElById.call(document, id);
            }
        };

        window.tinyHippos = {};

        _emulatedViewport = document.createElement("section");
        _emulatedDocument = document.createElement("section");
        _emulatedHtml = document.createElement("section");
        _emulatedBody = document.createElement("section");

        _emulatedViewport.clientHeight = 480;
        _emulatedViewport.clientWidth = 320;

        _emulatedHtml.appendChild(_emulatedBody);
        _emulatedDocument.appendChild(_emulatedHtml);
        _emulatedViewport.appendChild(_emulatedDocument);

        spyOn(platform, "current").andReturn({objects: {
            foo: {a: 1},
            bar: {b: 1},
            woot: [1, 2, 3, 4, 5]
        }});

        emulatorBridge.link(_emulatedFrame);
    }