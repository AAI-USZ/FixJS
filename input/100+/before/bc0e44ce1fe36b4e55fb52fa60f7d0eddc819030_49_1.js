function re_filter(event) {
    if (event.target.classList.contains('selected')) {
      return;
    }
    var action = event.target.dataset.action;
    var noMissedCallsSelector = '.log-item[data-type^=dialing]' +
      ':not(.collapsed):not([data-missed-calls]), ' +
      '.log-item[data-type=incoming-connected]:not(.collapsed):not([data-missed-calls])';
    var noMissedCallsItems = document.querySelectorAll(noMissedCallsSelector);
    var noMissedCallsLength = noMissedCallsItems.length;
    var missedCallsSelector = '.log-item[data-type=incoming]' +
      ':not(.collapsed), ' +
      '.log-item[data-type=incoming-refused]:not(.collapsed), ' +
      '.log-item[data-missed-calls]';
    var missedCallsItems = document.querySelectorAll(missedCallsSelector);
    var missedCallsLength = missedCallsItems.length;
    var missedCallItem;
    var primaryInfo;
    var secondaryInfo;
    var callTypeIcon;
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
    for (i = 0; i < missedCallsLength; i++) {
      missedCallItem = missedCallsItems[i];
      if (missedCallItem.dataset.missedCalls) {
        var iconClass;
        primaryInfo = missedCallItem.querySelector('.primary-info');
        secondaryInfo = missedCallItem.querySelector('.secondary-info');
        callTypeIcon = missedCallItem.querySelector('.call-type-icon');
        if (allCalls) {
          primaryInfo.textContent =
            missedCallItem.dataset.num + ' (' +
              missedCallItem.dataset.totalCalls + ')';
          secondaryInfo.textContent = missedCallItem.dataset.lastCallTime;
          var callType = missedCallItem.dataset.type;
          secondaryInfo.classList.remove('missed-call-font');
          if (callType.indexOf('dialing') != -1) {
            iconClass = 'icon-outgoing';
          } else if (callType.indexOf('incoming') != -1) {
            if (callType.indexOf('connected') == -1) {
              iconClass = 'icon-missed';
              secondaryInfo.classList.add('missed-call-font');
            } else {
              iconClass = 'icon-incoming';
            }
          }
        } else {
          iconClass = 'icon-missed';
          secondaryInfo.textContent = missedCallItem.dataset.lastMissedCallTime;
          secondaryInfo.classList.add('missed-call-font');
          if (missedCallItem.dataset.missedCalls > 1) {
            primaryInfo.textContent =
              missedCallItem.dataset.num + ' (' +
                missedCallItem.dataset.missedCalls + ')';
            secondaryInfo.textContent =
              missedCallItem.dataset.lastMissedCallTime;
          } else {
            primaryInfo.textContent = missedCallItem.dataset.num;
          }
        }
        callTypeIcon.classList.remove('icon-outgoing');
        callTypeIcon.classList.remove('icon-incoming');
        callTypeIcon.classList.remove('icon-missed');
        callTypeIcon.classList.add(iconClass);
      }
    }
    this.allFilter.classList.toggle('selected');
    this.missedFilter.classList.toggle('selected');
  }