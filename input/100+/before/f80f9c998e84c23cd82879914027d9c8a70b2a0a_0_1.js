function(msg) {

    // default values
    msg.name      = (pfc.users[msg.sender] != undefined) ? pfc.users[msg.sender].name : '???';
    msg.message   = (msg.message != undefined) ? msg.message : '';
    msg.timestamp = (msg.timestamp != undefined) ? msg.timestamp : Math.round(new Date().getTime() / 1000);
    msg.date      = new Date(msg.timestamp*1000).toLocaleTimeString();
    
    var groupmsg_last_dom = groupmsg_dom = $(pfc.element).find('.pfc-messages .messages-group:last');
    var messages_dom = $(pfc.element).find('.pfc-messages');
    
    if (groupmsg_dom.attr('data-from') != msg.name) {
      var html = $('<div class="messages-group" data-stamp="" data-from="">'
//          +'            <div class="avatar"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000001?d=wavatar&s=30" alt="" /></div>'
        +'            <div class="avatar"><div style="width:30px; height: 30px; background-color: #DDD;"></div></div>'
        +'            <div class="date"></div>'
        +'            <div class="name"></div>'
        +'          </div>');
        
      // fill the html fragment
      html.find('.name').text(msg.name);
      html.attr('data-from', msg.name);
      html.find('.date').text(msg.date);
      html.attr('data-stamp', msg.timestamp);
        
      // add a new message group
      messages_dom.append(html);
      groupmsg_dom = html;
    }

    // add the message to the latest active message group
    var message = $('<div class="message"></div>').html(nl2br(msg.message));
    groupmsg_dom.append(message);

    // scroll to the last message and memorize the scroll position
    var scroll_pos = 0;
    if (groupmsg_last_dom.length == 0) {
      scroll_pos = groupmsg_dom.outerHeight();
    } else {
      scroll_pos = groupmsg_dom.outerHeight() + groupmsg_last_dom.data('scroll-pos');
    }
    messages_dom.animate({scrollTop: scroll_pos});
    groupmsg_dom.data('scroll-pos', scroll_pos);
    
    return message;
  }