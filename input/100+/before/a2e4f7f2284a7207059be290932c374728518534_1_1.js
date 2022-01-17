function(event) {
    event.preventDefault();

    if (!spinner) spinner = new Spinner(spinnerOptions);

    var data = login.serialize();
    var children = login.getChildren().dispose();
    spinner.spin(login);

    var error = function() {
      spinner.stop();

      login.empty().adopt(children);
    };

    var name = data.username;

    API.authenticate(data).on({

      success: function(response) {
        spinner.stop();

        if (!/^access_token=/.test(response)) {
          error();
          return;
        }

        login.empty();
        API.invalidate();
        LocalStorage.set('User', {
          name: name,
          access_token: response.substr(13) // minus access_token
        });
        History.push('/');
      },

      error: error

    });
  }