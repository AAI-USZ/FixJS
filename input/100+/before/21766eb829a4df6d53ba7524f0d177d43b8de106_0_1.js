function () {
        $('#basic1').focus().blur();

        equal($('#basic1').val(), "Test", "The example should read 'Test'.");
        ok($('#basic1').hasClass('example'), "The class should be 'example'.");
    }