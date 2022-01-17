function () {
        $('#load1').example("Test");

        equal($('#load1').val(), "Already filled in", "The example should not be set.");
        ok(!$('#load1').hasClass('example'), "The class should not be 'example'.");
    }