function () {
        $('#custom1').focus().blur();

        equal($('#custom1').val(), "Test", "The example should reappear.");
        ok($('#custom1').hasClass('notExample'), "The class should be the specified one.");
    }