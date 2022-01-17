function(passageId, options) {
        var opts = options;
        if (step.util.isBlank(options)) {

            if(options == null) {
                //then first time run, so get defaults
                opts = step.defaults.passages[passageId].options;
            } else {
                opts = step.menu.getSelectedOptionsForMenu(passageId, 'DISPLAY');
            }

            if (opts) {
                this.options(passageId, opts, false);
            }
        }

        var menuOptions = $.isArray(opts) ? opts : opts.split(",");
        $.shout("initialise-passage-display-options", {
            passageId : passageId,
            menuOptions : menuOptions
        });
    }