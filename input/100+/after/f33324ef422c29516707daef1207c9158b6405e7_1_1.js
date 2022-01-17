function() {
        Raven.process("Error to ignore");

        // Raven should bail before making an ajax call
        equal(ajax_calls.length, 0);
    }