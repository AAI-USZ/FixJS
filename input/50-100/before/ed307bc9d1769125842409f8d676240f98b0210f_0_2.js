function () {
        var observable = new ko.observable("A");
        ko.setTemplateEngine(new dummyTemplateEngine({ someTemplate: function (data) {
            return "Value = " + data;
        }
        }));
        ko.renderTemplate("someTemplate", observable, null, testNode);
        value_of(testNode.childNodes[0].innerHTML).should_be("Value = A");

        observable("B");
        value_of(testNode.childNodes[0].innerHTML).should_be("Value = B");
    }