function () {
        var myArray = new ko.observableArray([{ personName: "Bob" }, { personName: "Frank"}]);
        ko.setTemplateEngine(new dummyTemplateEngine({ itemTemplate: "The item is [js: personName]" }));
        testNode.innerHTML = "<div data-bind='template: { name: \"itemTemplate\", foreach: myCollection }'></div>";

        ko.applyBindings({ myCollection: myArray }, testNode);
        value_of(testNode.childNodes[0]).should_contain_html("<div>the item is bob</div><div>the item is frank</div>");
        var originalBobNode = testNode.childNodes[0].childNodes[0];
        var originalFrankNode = testNode.childNodes[0].childNodes[1];

        myArray.push({ personName: "Steve" });
        value_of(testNode.childNodes[0]).should_contain_html("<div>the item is bob</div><div>the item is frank</div><div>the item is steve</div>");
        value_of(testNode.childNodes[0].childNodes[0]).should_be(originalBobNode);
        value_of(testNode.childNodes[0].childNodes[1]).should_be(originalFrankNode);
    }