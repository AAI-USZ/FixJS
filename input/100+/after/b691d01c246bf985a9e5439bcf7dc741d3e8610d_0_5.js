function () {
        $('#callback2').focus().blur();

        equal($('#callback2').val(), "Starting", "The example should read 'Starting'.");
        ok($('#callback2').hasClass('example'), "The class should be 'example'.");
    }