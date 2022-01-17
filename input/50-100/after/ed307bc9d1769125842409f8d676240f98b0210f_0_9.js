function () {
        ko.setTemplateEngine(new dummyTemplateEngine({
            someTemplate: "<input data-bind='value:message' />[js: message = 'goodbye'; undefined; ]"
        }));
        ko.renderTemplate("someTemplate", null, { templateRenderingVariablesInScope: { message: "hello"} }, testNode);
        value_of(testNode.childNodes[0].value).should_be("goodbye");
    }