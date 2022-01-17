function(cookieEvent)
    {
        // Return properly localized action.
        switch(cookieEvent.action)
        {
          case "deleted":
              return Locale.$STR("cookies.console.deleted");
          case "added":
              return Locale.$STR("cookies.console.added");
          case "changed":
              return Locale.$STR("cookies.console.changed");
          case "cleared":
              return Locale.$STR("cookies.console.cleared");
        }

        return "";
    }