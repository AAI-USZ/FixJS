function (f) {
          log("Accounts stored, result: " + JSON.stringify(f.result));
          // PalmCall.call("palm://info.mobo.syncml.client.service","getAccounts",{}).then(this, function(f2) {
            // if (f2.result.success === true) {
              // accounts = f2.result.accounts;
              // log("Got " + accounts.length + " accounts fresh from service");
            // }
            this.popScene();
          // });
        }