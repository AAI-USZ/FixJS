function() {
        ko.bindingHandlers.test = {
            init: function (element, valueAccessor) {
                var value = valueAccessor();
                ko.virtualElements.prepend(element, document.createTextNode(value));
            }
        };
        ko.virtualElements.allowedBindings['test'] = true;

        testNode.innerHTML = "x-<!--ko foreach: someitems--><!--ko test:$data--><!--/ko--><!--/ko-->";
        var someitems = ko.observableArray(["aaa","bbb"]);
        ko.applyBindings({ someitems: someitems }, testNode);
        value_of(testNode).should_contain_text('x-aaabbb');

        // Now remove items, and check the corresponding child nodes vanished
        someitems.splice(1, 1);
        value_of(testNode).should_contain_text('x-aaa');
    }