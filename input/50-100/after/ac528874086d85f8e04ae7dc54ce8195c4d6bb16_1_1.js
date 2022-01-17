function () {
        doc.head.appendChild(faviconLink);
        setUpAjaxSpyToLoadFixturesThroughTestSetup();

        rasterizeHTML.loadAndInlineCSS(doc, callback);

        expect(callback).toHaveBeenCalled();
        expect(doc.head.getElementsByTagName("style").length).toEqual(0);
        expect(doc.head.getElementsByTagName("link").length).toEqual(1);
    }