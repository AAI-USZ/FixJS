function() {
        ko.setTemplateEngine(new dummyTemplateEngine({
            outerTemplate:  "<div data-bind='template: { name:\"middleTemplate\", data: middleItem }'></div>",
            middleTemplate: "<div data-bind='template: { name: \"innerTemplate\", data: innerItem }'></div>",
            innerTemplate:  "(Data:[js:$data.val], Parent:[[js:$parents[0].val]], Grandparent:[[js:$parents[1].val]], Root:[js:$root.val], Depth:[js:$parents.length])"
        }));
        testNode.innerHTML = "<div data-bind='template: { name: \"outerTemplate\", data: outerItem }'></div>";

        ko.applyBindings({
            val: "ROOT",
            outerItem: {
                val: "OUTER",
                middleItem: {
                    val: "MIDDLE",
                    innerItem: { val: "INNER" }
                }
            }
        }, testNode);
        value_of(testNode.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]).should_contain_text("(Data:INNER, Parent:MIDDLE, Grandparent:OUTER, Root:ROOT, Depth:3)");
    }