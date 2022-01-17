function () {
            doc.head.appendChild(brokenCssLink);
            doc.head.appendChild(cssLink);

            rasterizeHTML.loadAndInlineCSS(doc, callback);

            expect(callback).toHaveBeenCalledWith([{
                resourceType: "stylesheet",
                url: "a_document_that_doesnt_exist.css"
            }]);
        }