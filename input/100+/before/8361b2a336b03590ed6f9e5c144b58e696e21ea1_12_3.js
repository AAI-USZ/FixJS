function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            Cloud.Objects.query({ classname: 'cars' }, finished);
        }