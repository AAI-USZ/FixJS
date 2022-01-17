function (e) {
        e.preventDefault();

        var languageCode = e.currentTarget.value;

        location.replace("/register?lang=" + languageCode);
    }