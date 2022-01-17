function($, sakai) {
    
        var testURL = "/~admin/public/test123";

        asyncTest("Ensure escapedHTML is returned correctly", function(){
            var xssString = "<script>alert(\"xss\");</script>";
            var escapedString = sakai.api.Security.escapeHTML(xssString);
            var data = {"name": escapedString};
            sakai.api.Server.saveJSON(testURL, data, function(success, data) {
                sakai.api.Server.loadJSON(testURL, function(success, data) {
                    equal(escapedString, data.name, "The escaped string returned as it was saved");
                    start();
                });
            });
        });

        $(window).trigger("addlocalbinding.qunit.sakai");

    }