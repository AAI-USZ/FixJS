function () {
        ko.setTemplateEngine(new dummyTemplateEngine({ someTemplate: "<INPUT Data-Bind='value:\"Hi\"' />" }));
        ko.renderTemplate("someTemplate", null, null, testNode);
        value_of(testNode.childNodes[0].childNodes[0].value).should_be("Hi");
    }