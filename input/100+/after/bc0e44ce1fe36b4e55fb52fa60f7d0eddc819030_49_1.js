function re_filter(event) {
    if (event.target.classList.contains('selected')) {
      return;
    }
    var action = event.target.dataset.action;
    var noMissedCallsSelector = '.log-item[data-type^=dialing]' +
      ':not(.collapsed), ' +
      '.log-item[data-type=incoming-connected]:not(.collapsed)';
    var noMissedCallsItems = document.querySelectorAll(noMissedCallsSelector);
    var noMissedCallsLength = noMissedCallsItems.length;
    var i;
    var allCalls = (action == 'all');
    if (allCalls) {
      for (i = 0; i < noMissedCallsLength; i++) {
        noMissedCallsItems[i].classList.remove('hide');
      }
    } else {
      for (i = 0; i < noMissedCallsLength; i++) {
        noMissedCallsItems[i].classList.add('hide');
      }
    }
    this.allFilter.classList.toggle('selected');
    this.missedFilter.classList.toggle('selected');
  }