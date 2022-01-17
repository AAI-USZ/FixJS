function (manager, config) {

        if (!(manager && config)) {
            return this;
        }

        this.manager = manager;

        this.parentNode = config.rootNode;

        this.build();

    }