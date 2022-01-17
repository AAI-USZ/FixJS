function () {
        ko.setTemplateEngine(new dummyTemplateEngine({ someTemplate: "<input type='radio' name='somename' value='abc' data-bind='checked:someValue' />" }));
        ko.renderTemplate("someTemplate", null, { templateRenderingVariablesInScope: { someValue: 'abc' } }, testNode);
        value_of(testNode.childNodes[0].childNodes[0].checked).should_be(true);
    }