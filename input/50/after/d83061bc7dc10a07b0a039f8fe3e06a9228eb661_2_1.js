function (e) {
        e.preventDefault();

        var languageCode = e.currentTarget.value;

        location.href = "/register?lang=" + languageCode;
    }