function(account, firstTime) {
    var accountNode = account.element;

    if (firstTime) {
      accountNode.getElementsByClassName('tng-account-item-label')[0]
        .textContent = account.name;
    }
  }