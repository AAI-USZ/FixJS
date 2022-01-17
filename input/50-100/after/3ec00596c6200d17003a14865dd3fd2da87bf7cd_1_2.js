function() {
        // See https://github.com/SteveSanderson/knockout/pull/440 and https://github.com/SteveSanderson/knockout/pull/144
        ko.setTemplateEngine(new dummyTemplateEngine({
            outerTemplate: "<div data-bind='text: $data'></div>[renderTemplate:innerTemplate]x", // [renderTemplate:...] is special syntax supported by dummy template engine
            innerTemplate: "inner <span data-bind='text: 123'></span>"
        }));
        testNode.innerHTML = "<div data-bind=\"template: { name: 'outerTemplate', foreach: items }\"></div>";

        // Bind against initial array containing one entry.
        var myArray = ko.observableArray(["original"]);
        ko.applyBindings({ items: myArray });
        value_of(testNode.childNodes[0]).should_contain_html("<div>original</div>inner <span>123</span>x");

        // Now replace the entire array contents with one different entry.
        myArray(["new"]);
        value_of(testNode.childNodes[0]).should_contain_html("<div>new</div>inner <span>123</span>x");
    }