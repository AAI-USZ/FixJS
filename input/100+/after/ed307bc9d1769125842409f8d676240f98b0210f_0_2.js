function () {
        var passedElement, passedDataItem;
        var myCallback = function(elementsArray, dataItem) {
            value_of(elementsArray.length).should_be(1);
            passedElement = elementsArray[0];
            passedDataItem = dataItem;
        }
        var myModel = {};
        ko.setTemplateEngine(new dummyTemplateEngine({ someTemplate: "ABC" }));
        ko.renderTemplate("someTemplate", myModel, { afterRender: myCallback }, testNode);
        value_of(passedElement.nodeValue).should_be("ABC");
        value_of(passedDataItem).should_be(myModel);
    }