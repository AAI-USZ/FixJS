function () {
        doc = document.implementation.createHTMLDocument("");

        extractCssUrlSpy = spyOn(rasterizeHTML.util, "extractCssUrl");
        joinUrlSpy = spyOn(rasterizeHTML.util, "joinUrl");
        ajaxSpy = spyOn(rasterizeHTML.util, "ajax").andCallFake(function (url, success, error) {
            var fixturesUrl = url.replace(rasterizeHTMLTestHelper.getBaseUri(), "").replace(/^(.\/)?fixtures\//, "");

            try {
                success(rasterizeHTMLTestHelper.readFixturesOrFail(fixturesUrl));
            } catch (err) {
                error();
            }
        });
        callback = jasmine.createSpy("loadAndInlineCssCallback");

        cssLink = window.document.createElement("link");
        cssLink.href = "fixtures/some.css";
        cssLink.rel = "stylesheet";
        cssLink.type = "text/css";

        anotherCssLink = window.document.createElement("link");
        anotherCssLink.href = "fixtures/another.css";
        anotherCssLink.rel = "stylesheet";
        anotherCssLink.type = "text/css";

        emptyCssLink = window.document.createElement("link");
        emptyCssLink.href = "fixtures/empty.css";
        emptyCssLink.rel = "stylesheet";
        emptyCssLink.type = "text/css";

        faviconLink = window.document.createElement("link");
        faviconLink.href = "favicon.ico";
        faviconLink.type = "image/x-icon";
    }