function thui_appendMessage(message) {
    if (!message.read) {
      ThreadUI.readMessages.push(message.id);
    }
    // Create DOM Element
    var messageDOM = document.createElement('div');
    // Add class
    messageDOM.classList.add('message-block');

    // Get data for rendering
    var outgoing = (message.delivery == 'sent' ||
      message.delivery == 'sending');
    var className = (outgoing ? 'sent' : 'received');
    var timestamp = message.timestamp.getTime();
    var bodyText = message.body.split('\n')[0];
    var bodyHTML = Utils.escapeHTML(bodyText);
    messageDOM.id = timestamp;
    var htmlStructure = '<span class="bubble-container ' + className + '">' +
                        '<div class="bubble">' + bodyHTML + '</div>' +
                        '</span>';
    // Add 'gif' if necessary
    if (message.delivery == 'sending') {
      htmlStructure += '<span class="message-option">' +
                        '<img src="style/images/ajax-loader.gif" class="gif">' +
                        '</span>';
    }
    //Add edit options
    htmlStructure += '<span class="message-option msg-checkbox">' +
                        '  <input value="' + message.id + '" type="checkbox">' +
                        '  <span></span>' +
                      '</span>';
    // Add structure to DOM element
    messageDOM.innerHTML = htmlStructure;
    //Check if we need a new header
    var tmpIndex = Utils.getDayDate(timestamp);
    if (tmpIndex > ThreadUI.headerIndex) {
      ThreadUI.createHeader(timestamp);
      ThreadUI.headerIndex = tmpIndex;
    }
    // Append element
    ThreadUI.view.appendChild(messageDOM);
    // Scroll to bottom
    ThreadUI.scrollViewToBottom();

  }