function thlui_createNewHeader(conversation) {
    function sameDay(timestamp1, timestamp2) {
      var day1 = new Date(timestamp1);
      var day2 = new Date(timestamp2);

      return day1.getFullYear() == day2.getFullYear() &&
             day1.getMonth() == day2.getMonth() &&
             day1.getDate() == day2.getDate();
    };

    if (this._lastHeader && sameDay(this._lastHeader, conversation.timestamp)) {
      return null;
    }

    this._lastHeader = conversation.timestamp;

    return '<div class="groupHeader">' +
      giveHeaderDate(conversation.timestamp) + '</div>';
  }