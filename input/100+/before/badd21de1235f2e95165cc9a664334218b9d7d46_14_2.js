function cl_createNewConversation(conversation, reg) {
    var dataName = escapeHTML(conversation.name || conversation.num, true);
    var name = escapeHTML(conversation.name);
    var bodyText = conversation.body.split('\n')[0];
    var bodyHTML = reg ? this.createHighlightHTML(bodyText, reg) :
                           escapeHTML(bodyText);
    var listClass = '';
    if (conversation.hidden) {
      listClass = 'hide';
    } else if (conversation.unreadCount > 0) {
      listClass = 'unread';
    }

    return '<a href="#num=' + conversation.num + '"' +
           ' data-num="' + conversation.num + '"' +
           ' data-name="' + dataName + '"' +
           ' data-notempty="' + (conversation.timestamp ? 'true' : '') + '"' +
           ' class="' + listClass + '">' +
           '<input type="checkbox" class="fake-checkbox"/>' + '<span></span>' +
           '  <div class="name">' + name + '</div>' +
           '  <div class="msg">' + bodyHTML + '</div>' +
           (!conversation.timestamp ? '' :
           '  <div class="time" data-time="' + conversation.timestamp + '">' +
             prettyDate(conversation.timestamp) + '</div>') +
           '<div class="unread-tag">' + conversation.unreadCount + '</div></a>';
  }