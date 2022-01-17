function () {
            doc.head.appendChild(cssLink);

            rasterizeHTML.loadAndInlineCSS(doc, callback);

            expect(callback).toHaveBeenCalledWith([]);
        }