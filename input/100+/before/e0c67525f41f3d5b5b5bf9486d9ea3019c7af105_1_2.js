function () {

    var testHtml = '<div data-bind="validationOptions: { insertMessages: false }"><input type="text" id="myTestInput" data-bind="value: firstName" /></div>';

    addTestHtml(testHtml);

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

    var noMsgs = $testInput.siblings().length;

    equals(noMsgs, 0, 'No Messages were inserted');

}