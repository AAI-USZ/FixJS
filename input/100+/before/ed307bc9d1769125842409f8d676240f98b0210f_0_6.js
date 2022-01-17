function() {
        ko.setTemplateEngine(new dummyTemplateEngine({
            someTemplate: "<button data-bind='click: someFunctionOnModel'>click me</button>"
        }));
        var viewModel = {
            didCallMyFunction : false,
            someFunctionOnModel : function() { this.didCallMyFunction = true }
        };
        ko.renderTemplate("someTemplate", viewModel, null, testNode);
        var buttonNode = testNode.childNodes[0].childNodes[0];
        value_of(buttonNode.tagName).should_be("BUTTON"); // Be sure we're clicking the right thing
        buttonNode.click();
        value_of(viewModel.didCallMyFunction).should_be(true);
    }