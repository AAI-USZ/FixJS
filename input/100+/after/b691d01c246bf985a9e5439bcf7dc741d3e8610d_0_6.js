function () {
        $('#m1').focus();

        equal($('#m1').val(), "", "The example should be cleared.");
        ok(!$('#m1').hasClass('m1'), "The class should no longer be 'm1'.");
    }