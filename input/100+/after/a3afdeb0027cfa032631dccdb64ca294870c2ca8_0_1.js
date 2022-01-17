function() {
        var observable = new ko.observable('A');
        testNode.innerHTML = "<select data-bind='value:myObservable'><option value=''>A</option><option value='A'>B</option></select>";
        ko.applyBindings({ myObservable: observable }, testNode);
        var dropdown = testNode.childNodes[0];
        value_of(dropdown.selectedIndex).should_be(1);

        dropdown.selectedIndex = 0;
        ko.utils.triggerEvent(dropdown, "change");
        value_of(observable()).should_be("");
    }