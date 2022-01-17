function(e) {
          if(uploaded == false || uploading == true) {
            e.preventDefault();
            alert(Drupal.t('You must upload one or more files before you can submit the form.'));
          }
        }