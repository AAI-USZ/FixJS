function () {
        Blade.Assert.Fail('This is a custom error, written on: {0}', [(new Date()).toDateString()]);
    }