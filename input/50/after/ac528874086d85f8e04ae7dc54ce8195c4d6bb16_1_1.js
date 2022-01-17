function () {
            doc.head.appendChild(brokenCssLink);
            setUpAjaxSpyToLoadFixturesThroughTestSetup();

            rasterizeHTML.loadAndInlineCSS(doc, "some_base_url/", callback);

            expect(callback).toHaveBeenCalledWith([{
                resourceType: "stylesheet",
                url: "some_base_url/a_document_that_doesnt_exist.css"
            }]);
        }