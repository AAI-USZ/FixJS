function(cookie, target, context)
    {
        CookieReps.Rep.getContextMenuItems.apply(this, arguments);

        var items = [];
        var rejected = cookie.cookie.rejected;

        if (!rejected)
        {
            items.push({
              label: Locale.$STR("cookies.Cut"),
              nol10n: true,
              command: Obj.bindFixed(this.onCut, this, cookie)
            });
        }

        items.push({
          label: Locale.$STR("cookies.Copy"),
          nol10n: true,
          command: Obj.bindFixed(this.onCopy, this, cookie)
        });

        if (!rejected)
        {
            items.push({
              label: Locale.$STR("cookies.Paste"),
              nol10n: true,
              disabled: CookieClipboard.isCookieAvailable() ? false : true,
              command: Obj.bindFixed(this.onPaste, this, cookie)
            });
            items.push("-");
        }

        items.push({
          label: Locale.$STR("cookies.CopyAll"),
          nol10n: true,
          command: Obj.bindFixed(this.onCopyAll, this, cookie)
        });

        if (!rejected)
        {
            items.push("-");
            items.push({
              label: Locale.$STR("cookies.Delete"),
              nol10n: true,
              command: Obj.bindFixed(this.onRemove, this, cookie)
            });

            items.push("-");
            items.push({
              label: Locale.$STR("cookies.Edit"),
              nol10n: true,
              command: Obj.bindFixed(this.onEdit, this, cookie)
            });

            if (cookie.cookie.rawValue)
            {
                items.push({
                  label: Locale.$STR("cookies.Clear Value"),
                  nol10n: true,
                  command: Obj.bindFixed(this.onClearValue, this, cookie)
                });
            }
        }

        // Permissions
        var permItems = CookiePermissions.getContextMenuItems(cookie, target, context);
        if (permItems)
            items = items.concat(permItems);

        // Breakpoints
        var breakOnItems = Breakpoints.getContextMenuItems(cookie, target, context);
        if (breakOnItems)
            items = items.concat(breakOnItems);

        return items;
    }