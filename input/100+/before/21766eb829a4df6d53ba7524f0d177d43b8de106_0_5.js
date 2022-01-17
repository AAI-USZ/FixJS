function () {

        /* Fake loading from cache by setting the example to be different to
         * the recorded defaultValue.
         */
        $('#c1').val('Cached example').example('Cached example');
        equal($('#c1').val(), "Filled in", "Value should have been reset to 'Filled in'.");
    }