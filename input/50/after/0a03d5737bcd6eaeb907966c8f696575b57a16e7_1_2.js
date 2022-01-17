function (auth) {
            // We only need an authority not the vocabulary.
            return auth.type.split("-")[0];
        }