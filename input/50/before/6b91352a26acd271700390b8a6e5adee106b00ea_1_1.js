function () {
            var $s = $("div.section h2:contains('FOO')", doc);
            expect($s.attr("id")).toEqual("foo");
            flushIframes();
        }