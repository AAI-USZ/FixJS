function(passageId, options) {
		    if(step.util.isBlank(options)) {
                //make sure that the state matches the state of the menu items selected
                var opts = step.menu.getSelectedOptionsForMenu(passageId, 'DISPLAY');
                if(opts) {
                    //we read this from the defaults that are already ticked, so just store
                    this.options(passageId, opts, false);
                }
                return;
            }
		    
		    var menuOptions = $.isArray(listOptions) ? listOptions : listOptions.split(",");
            $.shout("initialise-passage-display-options", { passageId: passageId, menuOptions: menuOptions});
        }