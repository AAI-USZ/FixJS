function () {
        ko.setTemplateEngine(new dummyTemplateEngine({ someTemplate: "<input data-bind='value:\n\"Hi\"' />" }));
        ko.renderTemplate("someTemplate", null, null, testNode);
        value_of(testNode.childNodes[0].childNodes[0].value).should_be("Hi");
    }