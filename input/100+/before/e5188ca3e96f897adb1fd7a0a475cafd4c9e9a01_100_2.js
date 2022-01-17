function()
    {
        var elements = ["fcEditCookieDlg", "fcNameLabel", "fcIsDomainLabel", "fcPathLabel",
            "fcExpireLabel", "fcSession", "fcValueLabel", "fcSecure", "fcHttpOnly"];

        for (var i=0; i<elements.length; i++)
        {
            var element = $(elements[i], this.window);
            if (element.hasAttribute("title"))
                Locale.internationalize(element, "title");

            if (element.hasAttribute("label"))
                Locale.internationalize(element, "label");

            if (element.hasAttribute("value"))
                Locale.internationalize(element, "value");
        }
    }