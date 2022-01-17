function () {
        var dependency = new ko.observable("A");
        ko.setTemplateEngine(new dummyTemplateEngine({ someTemplate: function () {
            return "Value = " + dependency();
        }
        }));

        ko.renderTemplate("someTemplate", null, null, testNode);
        value_of(testNode.childNodes.length).should_be(1);
        value_of(testNode.childNodes[0].innerHTML).should_be("Value = A");

        dependency("B");
        value_of(testNode.childNodes.length).should_be(1);
        value_of(testNode.childNodes[0].innerHTML).should_be("Value = B");
    }