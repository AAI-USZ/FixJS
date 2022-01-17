function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            if (++count == 5) {
                finish(testRun);
            }
        }