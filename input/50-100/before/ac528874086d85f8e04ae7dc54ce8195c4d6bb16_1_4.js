function () {
        joinUrlSpy.andCallThrough();

        doc = rasterizeHTMLTestHelper.readDocumentFixtureWithoutBaseURI("externalCSS.html");

        rasterizeHTML.loadAndInlineCSS(doc, "./fixtures/", callback);

        expect(callback).toHaveBeenCalled();
        expect(joinUrlSpy).toHaveBeenCalledWith("./fixtures/", "some.css");
    }