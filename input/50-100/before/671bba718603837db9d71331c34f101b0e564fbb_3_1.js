function(parentNode)
    {
        var args = {
            pageTitle: Locale.$STR("script.warning.no_system_source_debugging"),
            suggestion: Locale.$STR("script.suggestion.no_system_source_debugging")
        }

        var box = this.tag.replace(args, parentNode, this);
        var description = box.getElementsByClassName("disabledPanelDescription").item(0);
        FirebugReps.Description.render(args.suggestion, description,
            Obj.bindFixed(Firebug.visitWebsite,  this, "issue5110"));

        return box;
    }