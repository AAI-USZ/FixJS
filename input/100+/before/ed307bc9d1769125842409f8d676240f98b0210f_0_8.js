function() {
        var myArray = new ko.observableArray([{ someProp: 1 }, { someProp: 2, _destroy: 'evals to true' }, { someProp : 3 }, { someProp: 4, _destroy: ko.observable(false) }]);
        ko.setTemplateEngine(new dummyTemplateEngine({ itemTemplate: "someProp=[js: someProp]" }));
        testNode.innerHTML = "<div data-bind='template: { name: \"itemTemplate\", foreach: myCollection }'></div>";

        ko.applyBindings({ myCollection: myArray }, testNode);
        value_of(testNode.childNodes[0]).should_contain_html("<div>someprop=1</div><div>someprop=3</div><div>someprop=4</div>");
    }