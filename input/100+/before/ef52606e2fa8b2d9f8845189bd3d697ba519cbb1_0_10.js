function(popup) { 
            if (!MobDeals.Account._passwordHtml) { MobDeals.Account._passwordHtml = $('#password-popup').remove().html(); }
            popup.html(MobDeals.Account._passwordHtml);
            popup.find('input').focus();

            var readInput = function() { MobDeals.Account._password($(this), parent, params, callback); MobDeals.Popup.destroy(popup); }
            popup.find('form').submit(function() {
              $(this).find("*:focus").blur();
              return false;
            }).find('input').blur(readInput).focus();

            if (error) {
              var box = popup.find('.'+error.field+'-box');
              box.find('.errors').removeClass('hidden').text(error.message);
            }
          }