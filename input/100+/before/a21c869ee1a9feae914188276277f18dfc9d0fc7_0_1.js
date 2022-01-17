function(callback, returnUrl, cancelUrl) {
    MobDeals.Log.click({'event': 'facebook', 'return_url': returnUrl});

    var clientId = '249222915102781';    // production
    if (window.location.hostname.indexOf('mobstaging.com') != -1) {
      clientId = '288627961176125';      // staging
    } else if (window.location.hostname.indexOf('localhost') != -1 || window.location.hostname.indexOf('127.0.0.1') != -1) {
      var clientId = '293759800656841';  // development
    }

    if (!cancelUrl) {
      cancelUrl = returnUrl;
    }
    
    var redirectUrl = MobDeals.host('core') + '/users/auth/facebook/callback';
    var facebookLoginUrl = 'http://m.facebook.com/dialog/oauth?client_id=' + clientId +
    '&redirect_uri=' + escape(redirectUrl) +
    '&scope=email,publish_stream,user_about_me,friends_about_me,user_interests,friends_interests,user_likes,friends_likes,user_location,friends_location,user_education_history,friends_education_history,user_work_history,friends_work_history,user_relationships,friends_relationships,user_religion_politics, friends_religion_politics,user_subscriptions,friends_subscriptions,user_hometown,friends_hometown,user_groups,friends_groups,user_status,friends_status,user_birthday,friends_birthday,user_activities,friends_activities,user_about_me,friends_about_me,user_actions.news,user_actions.videos,user_actions.music,publish_actions,user_games_activity' + 
    '&state=' + escape(returnUrl) +
    '&response_type=code' + 
    '&display_type=touch';
    MobDeals.redirect(facebookLoginUrl);
  }