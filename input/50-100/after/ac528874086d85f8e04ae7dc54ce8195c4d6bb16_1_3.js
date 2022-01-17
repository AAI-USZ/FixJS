function () {
        doc.head.appendChild(emptyCssLink);

        // Circumvent Firefox having an issue locally loading empty files and returning a "404" instead.
        ajaxSpy.andCallFake(function (url, success, error) {
            success("");
        });

        rasterizeHTML.loadAndInlineCSS(doc, callback());

        expect(callback).toHaveBeenCalled();
        expect(doc.head.getElementsByTagName("style").length).toEqual(0);
        expect(doc.head.getElementsByTagName("link").length).toEqual(0);
    }