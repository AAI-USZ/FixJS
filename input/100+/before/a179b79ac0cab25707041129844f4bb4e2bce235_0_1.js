function(login_list) {
    $('#login_list_loader').hide();

    var out_list = "";
    for (var i = 0; i < login_list.length; ++i){
      var login_elem = "";
      var place = "";
      if ( login_list[i].place != "" ){
        place = "@" + login_list[i].place;
      }
      if ( login_list[i].pomo_min > 0 ){
        login_elem = '<span class="login-elem login-name-pomo"><span class="name">' + login_list[i].name + '</span>' + place + ' <span class="pomo-min">' + login_list[i].pomo_min + 'min</span></span>'
      }else{
        login_elem = '<span class="login-elem login-name' + login_list[i].id % LOGIN_COLOR_MAX + '"><span class="name">' + login_list[i].name + '</span>' + place + '</span>'
      }
      out_list += login_elem;
    }
      
    if ($('#login_list').html() != out_list){
      $('#login_list').html(out_list);
      $('#login_list').fadeIn();
      suggest_start(login_list);

      // add click event for each login names.
      $('#login_list .login-elem').click(function(){
        var name = $(this).children(".name").text();
        $('#message').val($('#message').val() + " >" + name + "さん ");
        $('#message').focus();
      });
    }

    latest_login_list = login_list.sort(function(a,b){ return b.name.length - a.name.length });
  }