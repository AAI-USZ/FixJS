function(callback, error, returnUrl) {
    MobDeals.Popup.show('login', function(popup) {
      if (!MobDeals.Account._promptHtml) {
        MobDeals.Account._promptHtml = $('#choose-login-type-popup').remove().html();
      }
      popup.html(MobDeals.Account._promptHtml);

      var readInput = function() {
        MobDeals.Account._username($(this), callback);
        MobDeals.Popup.destroy(popup);
      };
      var readInputCancelBubble = function() {
        $(this).find("*:focus").blur();
        return false;
      };
      popup.find('a.email').bind(CLICK, function(ev) {
 	      popup.find('.inputs').slideDown();
      popup.find('.email-box').removeClass('hidden').addClass('active').find('form').submit(readInputCancelBubble).find('input').blur(readInput).focus();
        popup.find('.mobile-box').addClass('hidden').removeClass('active');
      });
      popup.find('a.mobile').bind(CLICK, function(ev) {
 	      popup.find('.inputs').slideDown();
        popup.find('.mobile-box').removeClass('hidden').addClass('active').find('form').submit(readInputCancelBubble).find('input').blur(readInput).focus();
        popup.find('.email-box').addClass('hidden').removeClass('active');
      });

      if (error && error.errors) {
        for (var field in error.errors) {
          popup.find('a.' + field).click();
          var box = popup.find('.' + field + '-box');
          box.find('.errors').removeClass('hidden').text(field.charAt(0).toUpperCase() + field.slice(1) + ' ' + error.errors[field].join(', and '));
        }
      }

      popup.find('a.facebook').bind(CLICK, function(ev) {
        MobDeals.Account._facebook(callback, returnUrl);
        MobDeals.Popup.destroy(popup);
      });
    });
  }