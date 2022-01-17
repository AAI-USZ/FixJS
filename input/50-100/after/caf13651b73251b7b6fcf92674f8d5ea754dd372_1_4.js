function () {
        var opts = {
            settings: {
                userAgent: "PHANTOMJS-TEST-USER-AGENT"
            }
        };
        var page = new WebPage(opts);
        it("should have userAgent as '"+opts.settings.userAgent+"'",function () {
            expect(page.settings.userAgent).toEqual(opts.settings.userAgent);
        });
    }