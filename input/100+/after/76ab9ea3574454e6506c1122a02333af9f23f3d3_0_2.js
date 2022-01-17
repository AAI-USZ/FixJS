function () {
        var myArray = new ko.observableArray([{ personName: "Bob" }, { personName: "Frank"}]);
        ko.setTemplateEngine(new dummyTemplateEngine({ itemTemplate: "The item <span data-bind='text: personName'></span>is <span data-bind='text: $index'></span>" }));
        testNode.innerHTML = "<div data-bind='template: { name: \"itemTemplate\", foreach: myCollection }'></div>";

        ko.applyBindings({ myCollection: myArray }, testNode);
        value_of(testNode.childNodes[0]).should_contain_html("the item <span>bob</span>is <span>0</span>the item <span>frank</span>is <span>1</span>");

        var frank = myArray.pop(); // remove frank
        value_of(testNode.childNodes[0]).should_contain_html("the item <span>bob</span>is <span>0</span>");

        myArray.unshift(frank); // put frank in the front
        value_of(testNode.childNodes[0]).should_contain_html("the item <span>frank</span>is <span>0</span>the item <span>bob</span>is <span>1</span>");

    }