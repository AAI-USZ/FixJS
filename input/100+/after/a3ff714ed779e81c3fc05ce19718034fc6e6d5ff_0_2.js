function disableControls() {
        this.controls.search.setAttribute("disabled", true);
        this.controls.search.reset();
        this.controls.exp.setAttribute("disabled", true);
        this.controls.show.setAttribute("disabled", true);
        this.controls.launch.setAttribute("hidden", true);
        this.controls.launch.setAttribute("label", _("oqs.launch"));
        this.showInfo("");

        if (!prefs.debug) {
            this.controls.show_times.setAttribute("hidden", true);
        }
    }