function () {
        $('#callback2').focus();

        equal($('#callback2').val(), "", "The example should be cleared.");
        ok(!$('#callback2').hasClass('example'), "The class should no longer be 'example'.");
    }