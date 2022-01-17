function(options) {
        try {
            options.element = document.id(options.element) || options.element;
            if (options.element === null) {
                throw("DOM object not found");
            }
        } catch(e) {
            if (console) {
                console.log(e);
            }
            throw e;
        }

        if (!options.element.getProperty("multiple")) {
            return new StyleSelect.Simple(options);
        } else {
            return new StyleSelect.Multiple(options);
        }
    }