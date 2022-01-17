function(){
    var p = require("webpage").create();

    function pageTitle(page) {
        return page.evaluate(function(){
            return window.document.title;
        });
    }

    function setPageTitle(page, newTitle) {
        page.evaluate(function(newTitle){
            window.document.title = newTitle;
        }, newTitle);
    }

    it("should load a page full of frames", function(){
        runs(function() {
            p.open("../test/webpage-spec-frames/index.html");
        });
        waits(50);
    });

    it("should be able to detect frames at level 0", function(){
        expect(pageTitle(p)).toEqual("index");
        expect(p.frameName).toEqual("");
        expect(p.framesCount).toEqual(2);
        expect(p.framesName).toEqual(["frame1", "frame2"]);
        setPageTitle(p, pageTitle(p) + "-visited");
    });

    it("should go down to a child frame at level 1", function(){
        expect(p.switchToFrame("frame1")).toBeTruthy();
        expect(pageTitle(p)).toEqual("frame1");
        expect(p.frameName).toEqual("frame1");
        expect(p.framesCount).toEqual(2);
        expect(p.framesName).toEqual(["frame1-1", "frame1-2"]);
        setPageTitle(p, pageTitle(p) + "-visited");
    });

    it("should go down to a child frame at level 2", function(){
        expect(p.switchToFrame("frame1-2")).toBeTruthy();
        expect(pageTitle(p)).toEqual("frame1-2");
        expect(p.frameName).toEqual("frame1-2");
        expect(p.framesCount).toEqual(0);
        expect(p.framesName).toEqual([]);
        setPageTitle(p, pageTitle(p) + "-visited");
    });

    it("should go up to the parent frame at level 1", function(){
        expect(p.switchToParentFrame()).toBeTruthy();
        expect(pageTitle(p)).toEqual("frame1-visited");
        expect(p.frameName).toEqual("frame1");
        expect(p.framesCount).toEqual(2);
        expect(p.framesName).toEqual(["frame1-1", "frame1-2"]);
    });

    it("should go down to a child frame at level 2 (again)", function(){
        expect(p.switchToFrame(0)).toBeTruthy();
        expect(pageTitle(p)).toEqual("frame1-1");
        expect(p.frameName).toEqual("frame1-1");
        expect(p.framesCount).toEqual(0);
        expect(p.framesName).toEqual([]);
    });

    it("should go up to the main (top) frame at level 0", function(){
        expect(p.switchToMainFrame()).toBeUndefined();
        expect(pageTitle(p)).toEqual("index-visited");
        expect(p.frameName).toEqual("");
        expect(p.framesCount).toEqual(2);
        expect(p.framesName).toEqual(["frame1", "frame2"]);
    });

    it("should go down to (the other) child frame at level 1", function(){
        expect(p.switchToFrame("frame2")).toBeTruthy();
        expect(pageTitle(p)).toEqual("frame2");
        expect(p.frameName).toEqual("frame2");
        expect(p.framesCount).toEqual(3);
        expect(p.framesName).toEqual(["frame2-1", "frame2-2", "frame2-3"]);
    });
}