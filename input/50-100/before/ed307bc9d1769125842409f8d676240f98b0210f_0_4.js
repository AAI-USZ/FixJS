function () {
        ko.setTemplateEngine(new dummyTemplateEngine({ someTemplate: "result = [js: childProp]" }));
        testNode.innerHTML = "<div data-bind='template: { name: \"someTemplate\", data: someProp }'></div>";
        ko.applyBindings({ someProp: { childProp: 123} }, testNode);
        value_of(testNode.childNodes[0]).should_contain_html("<div>result = 123</div>");
    }