function() {
        testNode.innerHTML = "<div data-bind='foreach: someitems'><!-- ko if:true --><span data-bind='text: $data'></span><!-- /ko --></div>";
        var someitems = [ ko.observable('A'), ko.observable('B') ];
        ko.applyBindings({ someitems: someitems }, testNode);
        value_of(testNode).should_contain_text('AB');

        // Now update an item
        someitems[0]('A2');
        value_of(testNode).should_contain_text('A2B');
    }