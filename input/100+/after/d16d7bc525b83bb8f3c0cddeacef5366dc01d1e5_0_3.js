function thlui_appendThread(thread) {
    // Create DOM element
    var threadHTML = document.createElement('div');
    threadHTML.classList.add('item');

    // Retrieve info from thread
    var dataName = Utils.escapeHTML(thread.name ||
                                    thread.num, true);
    var name = Utils.escapeHTML(thread.name);
    var bodyText = thread.body.split('\n')[0];
    var bodyHTML = Utils.escapeHTML(bodyText);
    // Create HTML structure
    var structureHTML = '  <a id="' + thread.num +
            '" href="#num=' + thread.num + '"' +
            '     data-num="' + thread.num + '"' +
            '     data-name="' + dataName + '"' +
            '     data-notempty="' +
                  (thread.timestamp ? 'true' : '') + '">' +
            '    <span class="unread-mark">' +
            '      <i class="i-unread-mark"></i>' +
            '    </span>' +
            '    <div class="name">' + name + '</div>' +
                (!thread.timestamp ? '' :
            '    <div class="time ' +
                  (thread.unreadCount > 0 ? 'unread' : '') +
            '      " data-time="' + thread.timestamp + '">' +
                  Utils.getHourMinute(thread.timestamp) +
            '    </div>') +
            '    <div class="msg">"' + bodyHTML + '"</div>' +
            '    <div class="unread-tag"></div>' +
            '    <div class="photo">' +
            '    <img src="">' +
            '    </div>' +
            '  </a>' +
            '  <div class="checkbox-container">' +
            '   <input type="checkbox" name="' + thread.num + '">' +
            '   <span></span>' +
            '  </div>';
    // Update HTML and append
    threadHTML.innerHTML = structureHTML;
    this.view.appendChild(threadHTML);

    // Get the contact data for the number
    ContactDataManager.getContactData(thread.num, function gotContact(contact) {
      if (contact && contact.length > 0)
        ThreadListUI.updateMsgWithContact(thread.num, contact);
    });
  }