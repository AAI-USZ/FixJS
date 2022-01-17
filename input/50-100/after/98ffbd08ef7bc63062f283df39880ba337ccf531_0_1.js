function() {
        // Represents https://github.com/SteveSanderson/knockout/pull/440
        // Previously, the rewriting (which introduces a comment node before the bound node) was interfering
        // with the array-to-DOM-node mapping state tracking
        ko.setTemplateEngine(new dummyTemplateEngine({ mytemplate: "<div data-bind='text: $data'></div>" }));
        testNode.innerHTML = "<div data-bind=\"template: { name: 'mytemplate', foreach: items }\"></div>";

        // Bind against initial array containing one entry. UI just shows "original"
        var myArray = ko.observableArray(["original"]); 
        ko.applyBindings({ items: myArray });
        value_of(testNode.childNodes[0]).should_contain_html("<div>original</div>");

        // Now replace the entire array contents with one different entry.
        // UI just shows "new" (previously with bug, showed "original" AND "new")
        myArray(["new"]);
        value_of(testNode.childNodes[0]).should_contain_html("<div>new</div>");
    }