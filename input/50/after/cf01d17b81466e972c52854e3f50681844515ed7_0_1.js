function (view_name) {
        if (!(view_name in this.viewsByName)) {
            throw new TypeError();
        }

        this.alternatives.showAlternative(this.viewsByName[view_name]);
    }