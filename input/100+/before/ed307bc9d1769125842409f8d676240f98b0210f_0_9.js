function() {
        var myModel = {
            myObservable: ko.observable("some value"),
            unrelatedObservable: ko.observable()
        };
        ko.setTemplateEngine(new dummyTemplateEngine({myTemplate: "The value is [js:myObservable()]"}));
        testNode.innerHTML = "<div data-bind='template: \"myTemplate\", unrelatedBindingHandler: unrelatedObservable()'></div>";
        ko.applyBindings(myModel, testNode);

        // Right now the template references myObservable, so there should be exactly one subscription on it
        value_of(testNode.childNodes[0]).should_contain_html("<div>the value is some value</div>");
        value_of(myModel.myObservable.getSubscriptionsCount()).should_be(1);

        // By changing unrelatedObservable, we force the data-bind value to be re-evaluated, setting up a new template subscription,
        // so there have now existed two subscriptions on myObservable...
        myModel.unrelatedObservable("any value");

        // ...but, because the old subscription should have been disposed automatically, there should only be one left
        value_of(myModel.myObservable.getSubscriptionsCount()).should_be(1);
    }