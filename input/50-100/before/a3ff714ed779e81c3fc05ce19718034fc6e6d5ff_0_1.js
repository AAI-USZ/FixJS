function enableControls() {
        this.controls.search.removeAttribute("disabled");
        this.controls.exp.removeAttribute("disabled");
        this.controls.show.removeAttribute("disabled");
        this.controls.launch.removeAttribute("hidden");
        this.controls.launch.setAttribute("label", _("oqs.relaunch"));

        /*if (prefs.debug) {
            this.controls.show.removeAttribute("disabled");
            this.controls.show.removeAttribute("hidden");
        }*/
    }