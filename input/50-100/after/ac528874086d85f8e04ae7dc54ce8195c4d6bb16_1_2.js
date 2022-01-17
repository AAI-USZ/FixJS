function () {
        doc.head.appendChild(cssLink);
        setUpAjaxSpyToLoadFixturesThroughTestSetup();

        rasterizeHTML.loadAndInlineCSS(doc, callback);

        expect(callback).toHaveBeenCalled();
        expect(doc.head.getElementsByTagName("style").length).toEqual(1);
        expect(doc.head.getElementsByTagName("style")[0].textContent).toEqual("p { font-size: 14px; }");
        expect(doc.head.getElementsByTagName("link").length).toEqual(0);
    }