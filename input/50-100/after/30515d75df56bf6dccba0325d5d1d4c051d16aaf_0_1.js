function startOAuth() {
      clearStorage();

      var queryParams = ['client_id=' + appID,
                                'redirect_uri='
                                    + encodeURIComponent(getLocation() + "?state=redirect"),
                                'response_type=token',
                                'scope=' + encodeURIComponent('friends_about_me,\
                                          friends_birthday,email,friends_education_history,\
                                          friends_work_history,friends_status,friends_relationships')];
      var query = queryParams.join('&');
      var url = oauthDialogUri + query;

      window.console.log('URL: ', url);

      document.location = url;
    }