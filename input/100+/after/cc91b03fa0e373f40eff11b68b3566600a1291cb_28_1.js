function(event)
    {
        if (!this.resizing)
            return;

        this.resizing = false;

        var newWidth = this.startWidth + (event.clientX - this.startX);
        this.currColumn.style.width = newWidth + "px";

        // Store width into the preferences.
        var colId = this.currColumn.getAttribute("id");
        if (colId)
        {
            // Use directly nsIPrefBranch interface as the pref
            // doesn't have to exist yet.
            Options.setPref(Firebug.prefDomain, ".cookies." + colId + ".width", newWidth);
        }

        if (FBTrace.DBG_COOKIES)
        {
            var colId = this.currColumn.getAttribute("id");
            FBTrace.sysout("cookies.End resizing column (id): " + colId +
                ", new width: " + newWidth);
        }
    }