function thui_createMessage(message) {
    var dataId = message.id; // uuid
    var outgoing = (message.delivery == 'sent' ||
      message.delivery == 'sending');
    var num = outgoing ? message.sender : message.receiver;
    var dataNum = num;

    var className = (outgoing ? 'sender' : 'receiver') + '"';
    if (message.delivery == 'sending')
      className = 'sender pending"';

    var pic = 'style/images/contact-placeholder.png';

    //Split body in different lines if the sms contains \n
    var msgLines = message.body.split('\n');
    //Apply the escapeHTML body to each line
    msgLines.forEach(function(line, index) {
      msgLines[index] = escapeHTML(line);
    });
    //Join them back with <br />
    var body = msgLines.join('<br />');
    var timestamp = message.timestamp.getTime();

    return '<div class="message-block" ' + 'data-num="' + dataNum +
           '" data-id="' + dataId + '">' +
           '  <label class="fake-checkbox">' +
           '    <input data-id="' + dataId + '" type="checkbox"/>' +
           '    <span></span>' +
           '  </label>' +
           '  <div class="message-container ' + className + '>' +
           '    <div class="message-bubble"></div>' +
           '    <div class="time" data-time="' + timestamp + '">' +
                  giveHourMinute(message.timestamp) +
           '    </div>' +
           '    <div class="text">' + body + '</div>' +
           '  </div>' +
           '</div>';
  }