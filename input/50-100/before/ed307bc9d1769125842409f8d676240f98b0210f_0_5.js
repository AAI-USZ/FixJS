function () {
        ko.setTemplateEngine(new dummyTemplateEngine({
            outerTemplate: "outer template output, [renderTemplate:innerTemplate]", // [renderTemplate:...] is special syntax supported by dummy template engine
            innerTemplate: "inner template output <span data-bind='text: 123'></span>"
        }));
        testNode.innerHTML = "<div data-bind='template:\"outerTemplate\"'></div>";
        ko.applyBindings(null, testNode);
        value_of(testNode.childNodes[0]).should_contain_html("<div>outer template output, <div>inner template output <span>123</span></div></div>");
    }