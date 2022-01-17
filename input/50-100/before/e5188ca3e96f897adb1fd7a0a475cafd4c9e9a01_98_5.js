function(cookieEvent)
    {
        // Return properly localized action.
        switch(cookieEvent.action)
        {
          case "deleted":
              return Locale.$STR("firecookie.console.deleted");
          case "added":
              return Locale.$STR("firecookie.console.added");
          case "changed":
              return Locale.$STR("firecookie.console.changed");
          case "cleared":
              return Locale.$STR("firecookie.console.cleared");
        }

        return "";
    }