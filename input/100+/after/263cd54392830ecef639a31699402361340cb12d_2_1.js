function buildActivityHtml(template, activity) {
    var repliesHtml = '';
    if (activity.replies.length > 0) {
      if (activity.replies.length > 3) {
        var moreRepliesMessage = prefs.getMsg('label.view.all') + ' ' +
          activity.replies.length + ' ' + prefs.getMsg('label.activity.replies');
          repliesHtml += Mustache.render(templates.moreRepliesBar, {
          moreRepliesMessage: moreRepliesMessage
        });
      }
      for (var i = 0; i < activity.replies.length; i++) {
        var reply = activity.replies[i];
        reply.replyClass = i < activity.replies.length - 3 ? 'displayN' : '';
        repliesHtml += Mustache.render(templates.reply, reply);
      }
    }

    repliesHtml += Mustache.render(templates.newActivityReply, {
      activityId: activity.id,
      placeholderMessage: prefs.getMsg('label.placeholder.new.activity.reply'),
      writeLabel: prefs.getMsg('command.reply') });

    activity.repliesHtml = repliesHtml;
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