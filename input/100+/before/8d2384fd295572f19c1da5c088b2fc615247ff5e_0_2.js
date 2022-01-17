function(){
    var p = require("webpage").create();

    it("should call 'onPageCreated' every time a call to 'window.open' is done", function(){
        p.onPageCreated = jasmine.createSpy("onPageCreated spy");

        p.evaluate(function() {
            // yeah, I know globals. YIKES!
            window.w1 = window.open("http://www.google.com", "google");
            window.w2 = window.open("http://www.yahoo.com", "yahoo");
            window.w3 = window.open("http://www.bing.com", "bing");
        });
        expect(p.onPageCreated).toHaveBeenCalled();
        expect(p.onPageCreated.calls.length).toEqual(3);
    });

    it("should correctly resize the 'pages' array if a page gets closed", function(){
        expect(p.pages.length).toEqual(3);
        expect(p.pagesWindowName).toEqual(["google", "yahoo", "bing"]);

        p.evaluate(function() {
            window.w1.close();
        });

        waitsFor(function(){
            return p.pages.length === 2;
        }, "'pages' array didn't shrink after 1sec", 1000);

        runs(function(){
            expect(p.pages.length).toEqual(2);
            expect(p.pagesWindowName).toEqual(["yahoo", "bing"]);
        });
    });

    it("should resize the 'pages' array even more, when closing a page directly", function() {
        expect(p.pages.length).toEqual(2);
        expect(p.pagesWindowName).toEqual(["yahoo", "bing"]);

        var yahoo = p.getPage("yahoo");
        expect(yahoo).not.toBe(null);
        yahoo.release();

        waitsFor(function(){
            return p.pages.length === 1;
        }, "'pages' array didn't shrink after 1sec", 1000);

        runs(function(){
            expect(p.pages.length).toEqual(1);
            expect(p.pagesWindowName).toEqual(["bing"]);
        });
    });
}