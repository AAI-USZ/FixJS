function() {
      var friendsService = 'https://graph.facebook.com/fql?';

      var params = [ACC_T + '=' + accessToken,
                    'q' + '=' + encodeURIComponent(multiQStr),
                        'callback=owdFbInt.friendsReady'];
      var q = params.join('&');

      var jsonp = document.createElement('script');
      jsonp.src = friendsService + q;
      document.body.appendChild(jsonp);

      document.body.dataset.state = 'waiting';
    }