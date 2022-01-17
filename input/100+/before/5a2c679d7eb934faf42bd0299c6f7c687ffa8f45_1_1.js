function thlui_createNewConversation(conversation) {
    var dataName = escapeHTML(conversation.name || conversation.num, true);
    var name = escapeHTML(conversation.name);
    var bodyText = conversation.body.split('\n')[0];
    var bodyHTML = escapeHTML(bodyText);

    return '<div class="item">' +
           '  <label class="fake-checkbox">' +
           '    <input data-num="' +
                conversation.num + '"' + 'type="checkbox"/>' +
           '    <span></span>' +
           '  </label>' +
           '  <a href="#num=' + conversation.num + '"' +
           '     data-num="' + conversation.num + '"' +
           '     data-name="' + dataName + '"' +
           '     data-notempty="' +
                 (conversation.timestamp ? 'true' : '') + '"' +
           '     class="' +
                 (conversation.unreadCount > 0 ? 'unread' : '') + '">' +
           '    <span class="unread-mark">' +
           '      <i class="i-unread-mark"></i>' +
           '    </span>' +
           '    <div class="name">' + name + '</div>' +
                (!conversation.timestamp ? '' :
           '    <div class="time ' +
                  (conversation.unreadCount > 0 ? 'unread' : '') +
           '      " data-time="' + conversation.timestamp + '">' +
                  Utils.getHourMinute(conversation.timestamp) +
           '    </div>') +
           '    <div class="msg">"' + bodyHTML + '"</div>' +
           '    <div class="unread-tag"></div>' +
           '    <div class="photo"></div>' +
           '  </a>' +
           '</div>';
  }