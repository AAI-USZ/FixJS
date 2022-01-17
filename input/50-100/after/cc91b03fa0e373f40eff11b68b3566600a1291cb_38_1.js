function()
    {
        if (!this.autoCompleter)
        {
            this.autoCompleter = new Firebug.AutoCompleter(false,
                Obj.bind(this.getAutoCompleteRange, this),
                Obj.bind(this.getAutoCompleteList, this),
                Obj.bind(this.getAutoCompletePropSeparator, this),
                Obj.bind(this.autoCompleteAdjustSelection, this));
        }

        return this.autoCompleter;
    }