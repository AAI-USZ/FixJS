function () {
            doc.head.appendChild(cssLink);
            setUpAjaxSpyToLoadFixturesThroughTestSetup();

            rasterizeHTML.loadAndInlineCSS(doc, callback);

            expect(callback).toHaveBeenCalledWith([]);
        }