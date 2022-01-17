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

        return (!options.element.getProperty("multiple"))?new StyleSelect.Simple(options):new StyleSelect.Multiple(options);
    }