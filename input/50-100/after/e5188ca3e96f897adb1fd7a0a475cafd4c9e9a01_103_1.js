function(context, label, tooltiptext, domain, option)
    {
        var value = Options.getPref(domain, option) == 0;
        return {
            label: label,
            tooltiptext: tooltiptext,
            type: "checkbox",
            checked: value,
            command: Obj.bindFixed(this.onAllowCookie, this, domain, option)
        }
    }