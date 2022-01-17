function (request, sender, sendResponse) {
  if (!request.type)
    return;

  if (request.type == 'myUidAvailable') {
      myUid = request.myUid;
      sendInboxRequest();
      // request inbox again in 30 minutes
      if (inboxFetchInterval) { clearInterval(inboxFetchInterval); }
      inboxFetchInterval = setInterval(function() {
        if (myUid && friendList) { sendInboxRequest(); }
       }, 1000 * 60 * 30);
  } else if (request.type == 'friendListReceived') {
    if (!friendList) {
      // send status notifications so that every visible chat button
      // has correct statuses
      for (var i = 0; i < request.data.length; ++i) {
        chrome.bitpop.facebookChat.newIncomingMessage(request.data[i].uid.toString(), "",
          request.data[i].online_presence || 'offline', "");
      }
    }

    friendList = request.data;

  } else if (request.type == 'loggedOut') {
    if (inboxFetchInterval) { clearInterval(inboxFetchInterval); inboxFetchInterval = null; }
    statuses = {};
    friendList = null;
  } else if (request.type == 'wentOffline') {
    if (inboxFetchInterval) { clearInterval(inboxFetchInterval); inboxFetchInterval = null; }
    statuses = {};
    friendList = null;
  } else if (request.type == 'userStatusChanged') {
    // send change status message: empty message body signals to only check
    // for status change
    chrome.bitpop.facebookChat.newIncomingMessage(request.uid.toString(), "",
        request.status, "");

    // set global variable storing each user status, reported by XMPP
    statuses[request.uid.toString()] = request.status;

  } else if (request.type == 'newMessage') {
    var msgDate = new Date();  // set 'now' as the message arrive time

    console.assert(myUid != null);

    bitpop.saveToLocalStorage(myUid, request.from,
      bitpop.preprocessMessageText(request.body),
      msgDate,
      false);

    var found = false;
    var vs = chrome.extension.getViews();
    for (var i = 0; i < vs.length; ++i) {
      if (vs[i].location.hash.length > 1 && vs[i].location.hash.slice(1).split('&')[0] == request.from) {
        found = true;
        break;
      }
    }

    if (!found) {
      for (var i = 0; i < friendList.length; ++i) {
        if (friendList[i].uid == request.from) {
          // use status from fql result first,
          // then from xmpp server status update,
          // else set it to offline
          var status = null;
          if (friendList[i].online_presence !== null)
            status = friendList[i].online_presence;
          else if (statuses[friendList[i].uid.toString()])
            status = statuses[friendList[i].uid.toString()];
          else
            status = 'offline';

          chrome.bitpop.facebookChat.newIncomingMessage(
                             friendList[i].uid.toString(),
                             friendList[i].name,
                             status,
                             request.body);
          break;
        }
      }
    }
  } else if (request.type == 'typingStateChanged') {
    if (request.isTyping) {
      chrome.bitpop.facebookChat.newIncomingMessage(request.uid.toString(), "",
          'composing', "");
    } else {
      chrome.bitpop.facebookChat.newIncomingMessage(request.uid.toString(), "",
          'active', "");
    }
      
    if (friendList) {
      for (var i = 0; i < friendList.length; ++i) {
        if (friendList[i].uid == request.uid) {
          friendList[i].isTyping = request.isTyping;
          break;
        }
      }
    }
  }
}