function () {
        if ($.trim(this.options.initialPath) != "") {
            this.navigateTo(this.options.initialPath);
        }
        else {
            this.navigateTo("/?default_to_home");
        }
    }