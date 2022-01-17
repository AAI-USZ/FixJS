function () {
        doc.head.appendChild(cssLink);
        doc.head.appendChild(anotherCssLink);

        rasterizeHTML.loadAndInlineCSS(doc, callback);

        expect(callback).toHaveBeenCalled();
        expect(doc.head.getElementsByTagName("style").length).toEqual(1);
        expect(doc.head.getElementsByTagName("style")[0].textContent).toMatch(/(^|\n)p \{ font-size: 14px; \}($|\n)/);
        expect(doc.head.getElementsByTagName("style")[0].textContent).toMatch(/(^|\n)a \{ text-decoration: none; \}($|\n)/);
        expect(doc.head.getElementsByTagName("link").length).toEqual(0);
    }