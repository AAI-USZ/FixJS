function () {
        var cssWithRelativeResource;

        cssWithRelativeResource = window.document.createElement("link");
        cssWithRelativeResource.href = "below/backgroundImage.css";
        cssWithRelativeResource.rel = "stylesheet";
        cssWithRelativeResource.type = "text/css";

        extractCssUrlSpy.andReturn("../green.png");
        joinUrlSpy.andCallFake(function (base, url) {
            if (url === "below/backgroundImage.css" && base === "fixtures/") {
                return "fixtures/below/backgroundImage.css";
            } else if (url === "../green.png" && base === "below/backgroundImage.css") {
                return "green.png";
            }
        });
        setUpAjaxSpyToLoadFixturesThroughTestSetup();

        doc.head.appendChild(cssWithRelativeResource);

        // Let's assume the doc's baseURI is under "fixtures/"
        rasterizeHTML.loadAndInlineCSS(doc, "fixtures/", callback);

        expect(callback).toHaveBeenCalled();
        // Chrome 19 sets cssWithRelativeResource.href to ""
        expect(joinUrlSpy).toHaveBeenCalledWith("below/backgroundImage.css", "../green.png");

        expect(doc.head.getElementsByTagName("style").length).toEqual(1);
        expect(doc.head.getElementsByTagName("style")[0].textContent).toMatch(/url\(\"green\.png\"\)/);
    }