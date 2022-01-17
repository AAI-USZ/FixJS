function doUsername(){
      var cookie = document.cookie;
      var re = /.*?\buserData=([^;]+).*/;
      var userDataString = re.test(cookie) && $.trim(cookie.replace(re,'$1')) || localStorage.user || '{}';
      var user = JSON.parse(decodeURIComponent(userDataString == 'undefined' ? '{}' : userDataString));
      var userWelcomeOrLoginBox = $('#user-welcome-or-login');
      if(user.username){
        // logged in
        userWelcomeOrLoginBox.html(
          '<a href="/user">'+user.username+'</a> | '+
          // we could get fancy and check whether the first letter of the username is uppercase
          // and if so, make "Log Out" uppercase to match.
          '<a href="/user/logout?returnto='+location.href+'">log out</a>'
        );
        
        //if($.cookie('pendingUserAction')){
          //
        //}
        
      } else {
        // not logged in
        userWelcomeOrLoginBox.find('a').eq(0).click(function(e){
          // if the 'plain layout' module is active, then prevent default and get the login form via ajax
          e.preventDefault();
          var el = $(this);
          var userLoginBox = $('#user-login');
          if(!userLoginBox.length){
            $.get(el.attr('href'), function(text){
              var start = '<!--PAGE_BODY_START-->';
              var end = '<!--PAGE_BODY_END-->';
              if(text.length && text.indexOf(start)>-1 && text.indexOf(end)>-1){
                var html = '<div class="close">close</div>' + text.split(start)[1].split(end)[0];
                userLoginBox = $('<div id="user-login"/>').html(html).appendTo(userWelcomeOrLoginBox).show();
                userLoginBox.find('input')[0].focus();
                userWelcomeOrLoginBox.find('.close').click(function(){
                  userLoginBox.toggle();
                });
              }
            });
          } else {
            userLoginBox.toggle();
            userLoginBox.find('input')[0].focus();
          }
        });
      }
    }