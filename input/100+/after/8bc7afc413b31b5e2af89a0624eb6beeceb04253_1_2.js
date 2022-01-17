function() {
            ok(false, 'cancelledDfd should never resolve');
            if (!donezo) {
                donezo = true;
                start();
            }
        }