function(styleSheet)
    {
        if (FBTrace.DBG_CSS)
            FBTrace.sysout("css.updateLocation; " + (styleSheet ? styleSheet.href : "no stylesheet"));

        var rules = [];
        if (styleSheet)
        {
            if (!Css.shouldIgnoreSheet(styleSheet))
            {
                if (styleSheet.editStyleSheet)
                    styleSheet = styleSheet.editStyleSheet.sheet;
                var rules = this.getStyleSheetRules(this.context, styleSheet);
            }
        }

        if (rules.length)
        {
            this.template.tag.replace({rules: rules}, this.panelNode);
        }
        else
        {
            // If there are no rules on the page display a description that also
            // contains a link "create a rule".
            var warning = FirebugReps.Warning.tag.replace({object: ""}, this.panelNode);
            FirebugReps.Description.render(Locale.$STR("css.EmptyStyleSheet"),
                warning, Obj.bind(this.insertRule, this));
        }

        this.showToolbarButtons("fbCSSButtons", !Url.isSystemStyleSheet(this.location));

        Events.dispatch(this.fbListeners, "onCSSRulesAdded", [this, this.panelNode]);

        // If the full editing mode (not the inline) is on while the location changes,
        // open the editor again for another file.
        if (this.editing && this.stylesheetEditor && this.stylesheetEditor.editing)
        {
            // Remove the editing flag to avoid recursion. The StylesheetEditor.endEditing
            // calls refresh and consequently updateLocation of the CSS panel.
            this.editing = null;

            // Stop the current editing.
            this.stopEditing();

            // ... and open the editor again.
            this.toggleEditing();
        }
    }