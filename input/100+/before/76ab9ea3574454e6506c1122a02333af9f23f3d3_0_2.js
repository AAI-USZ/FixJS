function () {
        var myArray = new ko.observableArray([{ personName: "Bob" }, { personName: "Frank"}]);
        ko.setTemplateEngine(new dummyTemplateEngine({ itemTemplate: "The item <span data-bind='text: personName'></span>is <span data-bind='text: $index'></span>" }));
        testNode.innerHTML = "<div data-bind='template: { name: \"itemTemplate\", foreach: myCollection }'></div>";

        ko.applyBindings({ myCollection: myArray }, testNode);
        value_of(testNode.childNodes[0]).should_contain_html("<div>the item <span>bob</span>is <span>0</span></div><div>the item <span>frank</span>is <span>1</span></div>");

        var frank = myArray.pop(); // remove frank
        value_of(testNode.childNodes[0]).should_contain_html("<div>the item <span>bob</span>is <span>0</span></div>");

        myArray.unshift(frank); // put frank in the front
        value_of(testNode.childNodes[0]).should_contain_html("<div>the item <span>frank</span>is <span>0</span></div><div>the item <span>bob</span>is <span>1</span></div>");

    }