function () {
            var $div = $("<div><p><a></a></p></div>").appendTo($("body"));
            $div.find("p").renameElement("span");
            expect($div.find("span").length == 1).toBeTruthy();
            $div.remove();
        }