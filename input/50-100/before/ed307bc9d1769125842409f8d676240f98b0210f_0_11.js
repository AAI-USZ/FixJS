function () {
        ko.setTemplateEngine(new dummyTemplateEngine({ someTemplate: "<input type='checkbox' data-bind='checked:isChecked' />" }));
        ko.renderTemplate("someTemplate", null, { templateRenderingVariablesInScope: { isChecked: true } }, testNode);
        value_of(testNode.childNodes[0].childNodes[0].checked).should_be(true);
    }