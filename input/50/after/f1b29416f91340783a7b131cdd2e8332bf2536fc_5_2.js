function() {
    var bank = Tapedeck.Backend.Bank;
    Tapedeck.Backend.Bank.clearList(bank.trackListPrefix, bank.savedQueueName)
    this.queue.reset();

    this.setQueuePosition(-1);
  }