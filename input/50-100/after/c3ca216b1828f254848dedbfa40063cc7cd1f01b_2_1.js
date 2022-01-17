function () {
            var $div = $("<div><p><a></a></p><b>some text</b></div>").appendTo($("body"));
            $div.find("p").renameElement("span");
            $div.find("b").renameElement("i");
            expect($div.find("span").length).toEqual(1);
            expect($div.find("i").text()).toEqual("some text");
            $div.remove();
        }