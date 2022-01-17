function () {
        var baseUrl = "./fixtures/";

        joinUrlSpy.andCallThrough();
        setUpAjaxSpyToLoadFixturesThroughTestSetup();

        doc = rasterizeHTMLTestHelper.readDocumentFixture("externalCSS.html");
        expect(doc.baseURI).not.toBeNull();
        expect(doc.baseURI).not.toEqual("about:blank");
        expect(doc.baseURI).not.toEqual(baseUrl);

        rasterizeHTML.loadAndInlineCSS(doc, "./fixtures/", callback);

        expect(callback).toHaveBeenCalled();
        expect(joinUrlSpy).toHaveBeenCalledWith("./fixtures/", "some.css");
    }