function buildActivityHtml(template, activity) {
    if (activity.icon.indexOf(NXGadgetContext.clientSideBaseUrl) < 0) {
      var icon = activity.icon;
      if (icon != null && icon.length > 0) {
        if (icon[0] == '/') {
          icon = icon.substring(1);
        }
      } else {
        icon = constants.noActivityTypeIcon;
      }
      activity.icon = NXGadgetContext.clientSideBaseUrl + icon;
    }
    return Mustache.render(template, activity);
  }