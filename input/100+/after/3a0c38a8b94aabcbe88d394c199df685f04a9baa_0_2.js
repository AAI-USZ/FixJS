function cv_showConversation(num, pendingMsg) {
    delete ConversationListView._lastHeader;
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
      /** QUICK and dirty fix for the timestamp issues,
       * it seems that API call does not give the messages ordered
       * so we need to sort the array
       */
      messages.sort(function(a, b) {
        return a.timestamp - b.timestamp;
      });

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

        // Add a grouping header if necessary
        var header = ConversationListView.createNewHeader(msg) || '';
        fragment += header;

        fragment += self.createMessageThread(msg);
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