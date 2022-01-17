function () {


    var vm = {

        testObj: ko.observable(15).extend({ min: 1, max: 100, required: true, step: 2, pattern: /blah/i })

    };

    // setup the html
    addTestHtml('<input type="text" id="testElement" data-bind="value: testObj"/>');

    // make sure we allow element decorations
    ko.validation.init({

        decorateElement: true,

        writeInputAttributes: true

    }, true);

    applyTestBindings(vm);

    var $el = $('#testElement');
    var tests = {};

    ko.utils.arrayForEach(['required', 'min', 'max', 'step', 'pattern'], function (attr) {

        tests[attr] = $el.attr(attr);
    });

    ok(tests.required, "Required Found");
    strictEqual(tests.min, "1", "Min Found");
    strictEqual(tests.max, "100", "Max Found");
    strictEqual(tests.step, "2", "Step Found");
    strictEqual(tests.pattern, "blah", "Pattern Found");

}