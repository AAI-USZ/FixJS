function buildActivityHtml(template, activity) {
    var icon = activity.icon;
    if (icon != null && icon.length > 0) {
      if (icon[0] == '/') {
        icon = icon.substring(1);
      }
    } else {
      icon = constants.noActivityTypeIcon;
    }
    if (icon.indexOf(NXGadgetContext.clientSideBaseUrl) < 0) {
      icon = NXGadgetContext.clientSideBaseUrl + icon;
    }
    activity.icon = icon;
    return Mustache.render(template, activity);
  }