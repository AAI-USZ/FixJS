function(testRun) {
        // Verify default value of useSecure
        valueOf(testRun, Cloud.useSecure).shouldBeUndefined();
        // Verify useSecure property changes
        Cloud.useSecure = false;
        valueOf(testRun, Cloud.useSecure).shouldBeFalse();
        // Verify useSecure resets
        Cloud.useSecure = true;
        valueOf(testRun, Cloud.useSecure).shouldBeTrue();
        finish(testRun);
    }