function() {
        ko.setTemplateEngine(new dummyTemplateEngine());
        testNode.innerHTML = "Start <!-- ko template: { data: someData } -->Childprop: [js: childProp]<!-- /ko --> End";
        ko.applyBindings({ someData: { childProp: 'abc' } }, testNode);
        value_of(testNode).should_contain_html("start <!-- ko template: { data: somedata } -->childprop: abc<!-- /ko -->end");
    }