function () {
        $('#callback1').focus();

        equal($('#callback1').val(), "", "The example should be cleared.");
        ok(!$('#callback1').hasClass('example'), "The class should no longer be 'example'.");
    }