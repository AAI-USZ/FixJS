function () {
            doc.head.appendChild(brokenCssLink);
            doc.head.appendChild(anotherBrokenCssLink);
            setUpAjaxSpyToLoadFixturesThroughTestSetup();

            rasterizeHTML.loadAndInlineCSS(doc, callback);

            expect(callback).toHaveBeenCalledWith([jasmine.any(Object), jasmine.any(Object)]);
            expect(callback.mostRecentCall.args[0][0]).not.toEqual(callback.mostRecentCall.args[0][1]);
        }