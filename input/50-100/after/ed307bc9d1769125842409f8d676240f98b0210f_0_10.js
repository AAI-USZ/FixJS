function() {
        var myArray = new ko.observableArray([{ someProp: 1 }, { someProp: 2, _destroy: 'evals to true' }, { someProp : 3 }]);
        ko.setTemplateEngine(new dummyTemplateEngine({ itemTemplate: "<div>someProp=[js: someProp]</div>" }));
        testNode.innerHTML = "<div data-bind='template: { name: \"itemTemplate\", foreach: myCollection, includeDestroyed: true }'></div>";

        ko.applyBindings({ myCollection: myArray }, testNode);
        value_of(testNode.childNodes[0]).should_contain_html("<div>someprop=1</div><div>someprop=2</div><div>someprop=3</div>");
    }