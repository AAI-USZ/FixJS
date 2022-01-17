function() {
            console.log('cancelledDfd failed');
            ok(false, 'cancelledDfd should never fail');
            if (!donezo) {
                donezo = true;
                start();
            }
        }