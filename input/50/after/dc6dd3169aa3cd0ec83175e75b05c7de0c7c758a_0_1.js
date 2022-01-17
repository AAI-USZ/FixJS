function mb_notifyBadLogin(account) {
    this.__sendMessage({
      type: 'badLogin',
      account: account.toBridgeWire(),
    });
  }