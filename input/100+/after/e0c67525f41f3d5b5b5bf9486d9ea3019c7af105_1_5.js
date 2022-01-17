function () {
    var vm = {
        testObj: ko.observable().extend({ min: 1, max: 100 }),
        dummyProp: ko.observable().extend({ required: true })
    };

    vm.errors = ko.validation.group(vm);

    // setup the html
    addTestHtml('<span id="testMessage" data-bind="validationMessage: testObj"></span>');
    applyTestBindings(vm);

    var $msg = $('#testMessage');

    vm.testObj(-1); // should invalidate the min rule

    ok(!vm.testObj.isValid(), vm.testObj.error);
    equal(vm.testObj.error, $msg.text(), "Min rule was correctly triggered");

    vm.testObj(101); // should invalidate the max rule

    ok(!vm.testObj.isValid(), vm.testObj.error);
    equal(vm.testObj.error, $msg.text(), "Max rule was correctly triggered");
}