function () {

    var testHtml = '<div >' +
                        '<div data-bind="validationOptions: { insertMessages: false }">' +
                            '<div data-bind="with: someObj">' +
                                '<input id="myLastName" type="text" data-bind="value: lastName" />' +
                            '</div>' +
                        '</div>' +
                        '<input type="text" id="myFirstName" data-bind="value: firstName" />' +
                    '</div>';

    addTestHtml(testHtml);

    var vm = {
        firstName: ko.observable('a').extend({ required: true }),
        someObj: {
            lastName: ko.observable().extend({ minLength: 2 })
        }
    };

    applyTestBindings(vm);

    var $testInput = $('#myLastName');

    $testInput.val("a"); //set it 
    $testInput.change(); //trigger change event

    var isValid = vm.someObj.lastName.isValid();

    ok(!isValid, 'Last Name is NOT Valid');

    var noMsgs = $testInput.siblings().length;

    equal(noMsgs, 0, 'No Messages were inserted');

    var $firstName = $('#myFirstName');
    $firstName.val(""); //set it 
    $firstName.change(); //trigger change event

    ok(!vm.firstName.isValid(), 'Validation Still works correctly');

    var insertMsgCt = $firstName.siblings('span').length;
    equal(insertMsgCt, 1, 'Should have inserted 1 message beside the first name!');

}