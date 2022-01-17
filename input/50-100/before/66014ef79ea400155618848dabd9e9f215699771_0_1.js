function () {
        $('#f1').val("New value");
        $('#f1').change();

        equal($('#f1').val(), "New value", "Value should be changed to 'New value'.");
        ok(!$('#f1').hasClass('example'), "The example class should no longer be set.");

        /* Clear the field between test runs. */
        $('#f1').val('');
    }