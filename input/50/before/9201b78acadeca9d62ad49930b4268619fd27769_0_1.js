function () {
        Blade.Assert.Fail('This is a custom error, written at: {0}', [(new Date()).toDateString()]);
    }