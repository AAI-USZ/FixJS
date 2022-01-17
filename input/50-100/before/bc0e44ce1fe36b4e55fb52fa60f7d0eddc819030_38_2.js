function() {
      accounts.classList.remove(active);
      cals.classList.add(active);

      subject.showAccounts();

      assert.isTrue(accounts.classList.contains(active));
      assert.isFalse(cals.classList.contains(active));
    }