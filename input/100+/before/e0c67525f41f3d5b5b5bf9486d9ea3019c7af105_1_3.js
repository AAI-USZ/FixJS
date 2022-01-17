function () {

    var testHtml = '<div data-bind="validationOptions: { insertMessages: false }">' +
                        '<input type="text" id="myTestInput" data-bind="value: firstName" />' +
                        '<div data-bind="with: someObj">' +
                            '<input id="myLastName" type="text" data-bind="value: lastName" />' +
                        '</div>' +
                    '</div>';

    addTestHtml(testHtml);

    var vm = {
        firstName: ko.observable('').extend({ required: true }),
        someObj: {
            lastName: ko.observable().extend({ minLength : 2 })
        }
    };

    applyTestBindings(vm);

    var $testInput = $('#myLastName');

    $testInput.val("a"); //set it 
    $testInput.change(); //trigger change event

    var isValid = vm.someObj.lastName.isValid();

    ok(!isValid, 'Last Name is NOT Valid');

    var noMsgs = $testInput.siblings().length;

    equals(noMsgs, 0, 'No Messages were inserted');

}