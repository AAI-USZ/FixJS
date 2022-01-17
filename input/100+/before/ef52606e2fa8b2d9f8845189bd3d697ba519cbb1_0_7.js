function(ev) {
        MobDeals.Account.decookie(function() {
          MobDeals.Account._clear();
          MobDeals.Account.loginPrompt();
        });
      }