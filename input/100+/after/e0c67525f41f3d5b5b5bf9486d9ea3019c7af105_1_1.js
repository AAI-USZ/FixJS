function () {

    addTestHtml('<input id="myTestInput" data-bind="value: firstName" type="text" />');

    var vm = {
        firstName: ko.observable('').extend({ required: true })
    };

    applyTestBindings(vm);

    var $testInput = $('#myTestInput');

    $testInput.val("a"); //set it 
    $testInput.change(); //trigger change event

    $testInput.val(""); //set it 
    $testInput.change(); //trigger change event

    var isValid = vm.firstName.isValid();

    ok(!isValid, 'First Name is NOT Valid');

    var msg = $testInput.siblings().first().text();

    equal(msg, 'This field is required.', msg);
}