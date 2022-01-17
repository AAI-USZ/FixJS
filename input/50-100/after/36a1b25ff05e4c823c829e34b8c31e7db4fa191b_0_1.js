function () {
        if ($.trim(this.options.initialPath) != "") {
            this.navigateTo(this.options.initialPath);
        }
        else if ($.cookie("hueFileBrowserLastPath") != null) {
            this.navigateTo($.cookie("hueFileBrowserLastPath"));
        }
        else {
            this.navigateTo("/?default_to_home");
        }
    }