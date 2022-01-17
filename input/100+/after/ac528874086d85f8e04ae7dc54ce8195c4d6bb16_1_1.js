function () {
        ajaxSpy.andCallFake(function (url, success, error) {
            var fixturesUrl = url.replace(rasterizeHTMLTestHelper.getBaseUri(), "").replace(/^(.\/)?fixtures\//, "");

            try {
                success(rasterizeHTMLTestHelper.readFixturesOrFail(fixturesUrl));
            } catch (err) {
                error();
            }
        });
    }