function() {
        ko.setTemplateEngine(new dummyTemplateEngine({ myTemplate: "Value: [js: myProp().childProp]" }));
        testNode.innerHTML = "<div data-bind='template: { name: \"myTemplate\", \"if\": myProp, foreach: [$data, $data, $data] }'></div>";

        var viewModel = { myProp: ko.observable({ childProp: 'abc' }) };
        ko.applyBindings(viewModel, testNode);
        value_of(testNode.childNodes[0].childNodes[0]).should_contain_text("Value: abc");
        value_of(testNode.childNodes[0].childNodes[1]).should_contain_text("Value: abc");
        value_of(testNode.childNodes[0].childNodes[2]).should_contain_text("Value: abc");

        // Causing the condition to become false causes the output to be removed
        viewModel.myProp(null);
        value_of(testNode.childNodes[0]).should_contain_text("");

        // Causing the condition to become true causes the output to reappear
        viewModel.myProp({ childProp: 'def' });
        value_of(testNode.childNodes[0].childNodes[0]).should_contain_text("Value: def");
        value_of(testNode.childNodes[0].childNodes[1]).should_contain_text("Value: def");
        value_of(testNode.childNodes[0].childNodes[2]).should_contain_text("Value: def");
    }