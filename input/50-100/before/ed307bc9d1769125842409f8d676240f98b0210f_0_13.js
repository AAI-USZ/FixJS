function() {
        var myModel = {
            someAdditionalData: { myAdditionalProp: "someAdditionalValue" },
            people: new ko.observableArray([
                { name: "Alpha" },
                { name: "Beta" }
            ])
        };
        ko.setTemplateEngine(new dummyTemplateEngine({myTemplate: "Person [js:name] has additional property [js:templateOptions.myAdditionalProp]"}));
        testNode.innerHTML = "<div data-bind='template: {name: \"myTemplate\", foreach: people, templateOptions: someAdditionalData }'></div>";

        ko.applyBindings(myModel, testNode);
        value_of(testNode.childNodes[0]).should_contain_html("<div>person alpha has additional property someadditionalvalue</div><div>person beta has additional property someadditionalvalue</div>");
    }