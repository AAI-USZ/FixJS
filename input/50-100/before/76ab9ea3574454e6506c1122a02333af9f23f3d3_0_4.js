function () {
        var myArray = new ko.observableArray([undefined, null]);
        ko.setTemplateEngine(new dummyTemplateEngine({ itemTemplate: "The item is <span data-bind='text: String($data)'></span>" }));
        testNode.innerHTML = "<div data-bind='template: { name: \"itemTemplate\", foreach: myCollection }'></div>";

        ko.applyBindings({ myCollection: myArray }, testNode);
        value_of(testNode.childNodes[0]).should_contain_html("<div>the item is <span>undefined</span></div><div>the item is <span>null</span></div>");
    }