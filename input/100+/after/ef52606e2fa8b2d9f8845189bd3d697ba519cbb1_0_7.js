function(popup) { 
      if (!MobDeals.Account._createPasswordHtml) { MobDeals.Account._createPasswordHtml = $('#create-password-popup').remove().html(); }
      popup.html(MobDeals.Account._createPasswordHtml);
      popup.find('input').focus();

      var readInput = function() { 
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
      };

      popup.find('form').submit(function() { $(this).find("*:focus").blur(); return false; }).find('input').blur(readInput).focus();

      if (error) {
        var box = popup.find('.'+error.field+'-box');
        box.find('.errors').text(error.message).removeClass('hidden');
      }
    }