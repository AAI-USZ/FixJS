function () {
        var myArray = new ko.observableArray([{ personName: "Bob" }, { personName: "Frank"}]);
        ko.setTemplateEngine(new dummyTemplateEngine({ itemTemplate: "The item # is <span data-bind='text: $index'></span>" }));
        testNode.innerHTML = "<div data-bind='template: { name: \"itemTemplate\", foreach: myCollection }'></div>";

        ko.applyBindings({ myCollection: myArray }, testNode);
        value_of(testNode.childNodes[0]).should_contain_html("the item # is <span>0</span>the item # is <span>1</span>");
    }