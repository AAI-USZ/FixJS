function cv_showConversation(num, pendingMsg) {
    var self = this;
    var view = this.view;
    var bodyclassList = document.body.classList;
    var currentScrollTop;

    if (num !== '*') {
      var filter = new MozSmsFilter();
      filter.numbers = [num || ''];

      if (this.filter == num)
        currentScrollTop = view.scrollTop;

      this.filter = num;
    } else {
      /* XXX: gaia issue #483 (New Message dialog design)
              gaia issue #108 (contact picker)
      */

      this.num.value = '';
      this.view.innerHTML = '';
      bodyclassList.add('conversation-new-msg');
      bodyclassList.add('conversation');
      return;
    }

    bodyclassList.remove('conversation-new-msg');

    var receiverId = parseInt(num);

    var self = this;
    var options = {
      filterBy: ['tel'],
      filterOp: 'contains',
      filterValue: num
    };

    this.num.value = num;
    this.title.num = num;
    this.title.textContent = num;

    ContactDataManager.getContactData(options, function getContact(result) {
      var contactImageSrc = 'style/images/contact-placeholder.png';
      if (result && result.length > 0) {
        var contact = result[0];
        self.title.textContent = contact.name[0];
        //TODO: apply the real contact image:
        //contactImageSrc = contact.photo;
      }
      var images = self.view.querySelectorAll('.photo img');
      for (var i = 0; i < images.length; i++)
        images[i].src = contactImageSrc;
    });

    MessageManager.getMessages(function mm_getMessages(messages) {
      var lastMessage = messages[messages.length - 1];
      if (pendingMsg &&
          (!lastMessage || lastMessage.id !== pendingMsg.id))
        messages.push(pendingMsg);

      var fragment = '';
      var unreadList = [];

      for (var i = 0; i < messages.length; i++) {
        var msg = messages[i];

        if (!msg.read)
          unreadList.push(msg.id);

        var dataId = msg.id; // uuid

        var outgoing = (msg.delivery == 'sent' || msg.delivery == 'sending');
        var num = outgoing ? msg.sender : msg.receiver;
        var dataNum = num;

        var className = (outgoing ? 'sender' : 'receiver') + '"';
        if (msg.delivery == 'sending')
          className = 'receiver pending"';

        var pic = 'style/images/contact-placeholder.png';

        //Split body in different lines if the sms contains \n
        var msgLines = msg.body.split('\n');
        //Apply the escapeHTML body to each line
        msgLines.forEach(function(line, index) {
          msgLines[index] = escapeHTML(line);
        });
        //Join them back with <br />
        var body = msgLines.join('<br />');
        var timestamp = msg.timestamp.getTime();

        fragment += '<div class="message-block" ' + 'data-num="' + dataNum +
                    '" data-id="' + dataId + '">' +
                    '  <input type="checkbox" class="fake-checkbox"/>' +
                    '  <span></span>' +
                    '  <div class="message-container ' + className + '>' +
                    '    <div class="message-bubble"></div>' +
                    '    <div class="time" data-time="' + timestamp + '">' +
                         giveHourMinute(msg.timestamp) +
                    '    </div>' +
                    '    <div class="text">' + body + '</div>' +
                    '  </div>' +
                    '</div>';
      }

      view.innerHTML = fragment;
      self.scrollViewToBottom(currentScrollTop);

      bodyclassList.add('conversation');

      MessageManager.markMessagesRead(unreadList, true, function markMsg() {
        // TODO : Since spec do not specify the behavior after mark success or
        //        error, we do nothing currently.
      });
    }, filter, true);
  }