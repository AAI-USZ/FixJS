function () {
    var emulatorBridge = require('ripple/emulatorBridge'),
        platform = require('ripple/platform'),
        old_gElById,
        _emulatedBody,
        _emulatedHtml,
        _emulatedDocument,
        _emulatedViewport,
        _emulatedFrame = {
            contentWindow: {
                screen: {}
            }
        };

    beforeEach(function () {
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
    });

    afterEach(function () {
        delete window.tinyHippos;
        _emulatedViewport = null;
        _emulatedBody = null;
        _emulatedHtml = null;
        _emulatedDocument = null;
        document.getElementById = old_gElById;
    });

    // --------- Tests -------- \\

    it("screen availHeight is overriden properly", function () {
        var viewport = _emulatedViewport;
        expect(viewport.clientHeight).toEqual(screen.availHeight);
    });

    it("screen availWidth is overriden properly", function () {
        var viewport = _emulatedViewport;
        expect(viewport.clientWidth).toEqual(screen.availWidth);
    });

    it("screen height is overriden properly", function () {
        var viewport = _emulatedViewport;
        expect(viewport.clientHeight).toEqual(screen.height);
    });

    it("screen width is overriden properly", function () {
        var viewport = _emulatedViewport;
        expect(viewport.clientWidth).toEqual(screen.availWidth);
    });

    it("window.innerHeight is overriden properly", function () {
        var viewport = _emulatedViewport;
        expect(viewport.clientHeight).toEqual(window.innerHeight);
    });

    it("window.innerWidth is overriden properly", function () {
        var viewport = _emulatedViewport;
        expect(viewport.clientWidth).toEqual(window.innerWidth);
    });

    it("it marshals tinyHippos", function () {
        expect(window.tinyHippos).toBeDefined();
        expect(window.tinyHippos).toBe(_emulatedFrame.contentWindow.tinyHippos);
    });

    it("it marshals XMLHttpRequest", function () {
        expect(window.XMLHttpRequest).toBeDefined();
        expect(window.XMLHttpRequest).toBe(_emulatedFrame.contentWindow.XMLHttpRequest);
    });

    it("it marshals over everything in the sandbox", function () {
        expect(window.foo).toBeDefined();
        expect(window.bar).toBeDefined();
        expect(window.woot).toBeDefined();
        expect(window.foo).toBe(_emulatedFrame.contentWindow.foo);
        expect(window.bar).toBe(_emulatedFrame.contentWindow.bar);
        expect(window.woot).toBe(_emulatedFrame.contentWindow.woot);
    });
}