function() {
        var isIE = navigator.userAgent.indexOf("MSIE") >= 0;

        if (isIE) {
            var myobservable = new ko.observable(123).extend({ notify: 'always' });
            var numUpdates = 0;
            myobservable.subscribe(function() { numUpdates++ });
            testNode.innerHTML = "<input data-bind='value:someProp' />";
            ko.applyBindings({ someProp: myobservable }, testNode);

            // First try change then blur
            testNode.childNodes[0].value = "some user-entered value";
            ko.utils.triggerEvent(testNode.childNodes[0], "propertychange");
            ko.utils.triggerEvent(testNode.childNodes[0], "change");
            value_of(myobservable()).should_be("some user-entered value");
            value_of(numUpdates).should_be(1);
            ko.utils.triggerEvent(testNode.childNodes[0], "blur");
            value_of(numUpdates).should_be(1);

            // Now try blur then change
            testNode.childNodes[0].value = "different user-entered value";
            ko.utils.triggerEvent(testNode.childNodes[0], "propertychange");
            ko.utils.triggerEvent(testNode.childNodes[0], "blur");
            value_of(myobservable()).should_be("different user-entered value");
            value_of(numUpdates).should_be(2);
            ko.utils.triggerEvent(testNode.childNodes[0], "change");
            value_of(numUpdates).should_be(2);
        }
    }