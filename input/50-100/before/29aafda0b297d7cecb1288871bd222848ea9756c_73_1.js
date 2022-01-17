function(context, label, domain, option)
    {
        var value = Options.get(option) == 0;
        return { label: Locale.$STR(label), nol10n: true, type: "checkbox",
            checked: value,
            command: Obj.bindFixed(this.onAllowCookie, this, domain, option)}
    }