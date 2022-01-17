function (options) {
        if (!options.vocab) {
            options.vocab = cspace.vocab({schema: options.schema});
        }
    }