function () {
        // TODO: Both TreeStore filter and NodeInterface -> show/hide are missing in ExtJs 4.x
        this.showAllMode = !this.showAllMode;
        if (this.changedData && this.initialData) {
            this.setRootNode();
        }
    }