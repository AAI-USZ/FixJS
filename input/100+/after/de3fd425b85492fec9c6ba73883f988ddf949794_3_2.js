function SettingsMainCard(domNode, mode, args) {
  this.domNode = domNode;

  this.acctsSlice = MailAPI.viewAccounts(false);
  this.acctsSlice.onsplice = this.onAccountsSplice.bind(this);

  domNode.getElementsByClassName('tng-close-btn')[0]
    .addEventListener('click', this.onClose.bind(this), false);

  this.accountsContainer =
    domNode.getElementsByClassName('tng-accounts-container')[0];
  bindContainerClickAndHold(this.accountsContainer,
                            this.onClickAccount.bind(this),
                            this.onHoldAccount.bind(this));

  domNode.getElementsByClassName('tng-account-add')[0]
    .addEventListener('click', this.onClickAddAccount.bind(this), false);
}