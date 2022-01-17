function () {
        var observable = new ko.observable("ABC");
        var timesRenderedOuter = 0, timesRenderedInner = 0;
        ko.setTemplateEngine(new dummyTemplateEngine({
            outerTemplate: function () { timesRenderedOuter++; return "outer template output, [renderTemplate:innerTemplate]" }, // [renderTemplate:...] is special syntax supported by dummy template engine
            innerTemplate: function () { timesRenderedInner++; return observable() }
        }));
        testNode.innerHTML = "<div data-bind='template:\"outerTemplate\"'></div>";
        ko.applyBindings(null, testNode);
        value_of(testNode.childNodes[0]).should_contain_html("outer template output, abc");
        value_of(timesRenderedOuter).should_be(1);
        value_of(timesRenderedInner).should_be(1);

        observable("DEF");
        value_of(testNode.childNodes[0]).should_contain_html("outer template output, def");
        value_of(timesRenderedOuter).should_be(1);
        value_of(timesRenderedInner).should_be(2);
    }