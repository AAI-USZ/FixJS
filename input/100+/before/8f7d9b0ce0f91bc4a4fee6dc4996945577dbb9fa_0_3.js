function(json) {
      if(formName == 'embedly_providers_form') {
        if(json.error) {
          $('.embedly-error').fadeIn();
        }
        else {
          $('.embedly-updated').fadeIn();
        }
      }
      else if(formName == 'embedly_update_providers_form') {
        if(json.hasOwnProperty('error')) {
          $('.embedly-error').fadeIn();
        }
        else {
          if($('.embedly-service-generator').length != 1) {
            window.location.reload();
            $('.embedly-service-generator').html('');
            $.each(json, function(index, obj) {
              $('.embedly-service-generator').append(create_provider(obj));
            });
            $('.embedly-updated').fadeIn();
          }
        }
      }
    }