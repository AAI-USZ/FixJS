function buildActivityHtml(template, activity) {
    var icon = activity.icon;
    if (icon != null && icon.length > 0) {
      if (icon[0] == '/') {
        icon = icon.substring(1);
      }
    } else {
      icon = constants.noActivityTypeIcon;
    }
    if (activity.icon.indexOf(NXGadgetContext.clientSideBaseUrl) < 0) {
      activity.icon = NXGadgetContext.clientSideBaseUrl + icon;
    }
    return Mustache.render(template, activity);
  }