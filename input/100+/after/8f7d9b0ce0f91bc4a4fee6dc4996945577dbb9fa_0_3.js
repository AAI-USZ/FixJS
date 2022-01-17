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
          if($('#services-source').length != 1) {
            window.location.reload();
            $('#services-source').html('');
            $.each(json, function(index, obj) {
              $('#services-source').append(create_provider(obj, cnt++));
            });
            $('#embedly-message.embedly-updated').fadeIn();
          }
        }
      }
    }