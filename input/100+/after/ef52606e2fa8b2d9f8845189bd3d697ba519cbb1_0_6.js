function() { 
        $.support.cors = true;

        $.ajax({
          url: MobDeals.host('core')+'/account/passwords.json', 
          type: 'POST',
          xhrFields: {withCredentials: true},
          data: { password: popup.find('input').val() },
          crossDomain: true,
          success: function(data) {
            if (data.errors) { MobDeals.Account.createPassword(callback, data.error); }
            else { MobDeals.Account._authenticated(data); callback.apply(callback); }
          },
          dataType: 'json'
        });
        MobDeals.Popup.destroy(popup);
      }