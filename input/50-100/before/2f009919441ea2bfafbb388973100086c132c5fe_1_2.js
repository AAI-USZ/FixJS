function(passageId, options) {
            var menuOptions = $.isArray(options) ? options : options.split(",");
            $.shout("initialise-passage-display-options", { passageId: passageId, menuOptions: menuOptions});
        }