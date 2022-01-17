function () {
        joinUrlSpy.andCallThrough();

        doc = rasterizeHTMLTestHelper.readDocumentFixture("externalCSS.html");

        rasterizeHTML.loadAndInlineCSS(doc, callback);

        expect(callback).toHaveBeenCalled();
        expect(joinUrlSpy).toHaveBeenCalledWith(doc.baseURI, "some.css");

        expect(doc.getElementsByTagName("style").length).toEqual(1);
        expect(doc.getElementsByTagName("style")[0].textContent).toEqual("p { font-size: 14px; }");
        expect(doc.getElementsByTagName("link").length).toEqual(0);
    }