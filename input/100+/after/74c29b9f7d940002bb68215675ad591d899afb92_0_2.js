function() {
      var action = ($(this).siblings('ul').css('display') === 'none' ? 'dropdown' : 'rollup');
      $(this).siblings('ul').slideToggle(80);
      if ($(this).hasClass('username')) {
        var username = $(this).data('username');
        $('#checker_username').val(username);
        if (whada_logged_in_as_admin) {
          set_priv_operator('username', action, {username:username});
          $('#drop_user_name').val(username);
        }
      }
      if ($(this).hasClass('privilege')) {
        var privname = $(this).text();
        $('#checker_privilege').val(privname);
        if (whada_logged_in_as_admin) {
          set_priv_operator('privilege', action, {privilege:privname});
          $('#drop_priv_name').val(privname);
        }
      }
      $('ul.items li')
        .unbind('hover')
        .hover(
          function() { $(this).addClass('ui-state-hover'); }, 
          function() { $(this).removeClass('ui-state-hover'); }
        );
      $('ul.items li.operation_item')
        .unbind('click')
        .click(function(){
          $('.control #operator').slideDown(50);
          var username = $(this).closest('.items').siblings('.username').data('username');
          var parts = $(this).text().split(':');
          set_priv_operator('full', 'full', {username:username, privilege:parts[0], status:parts[1]});
          $('#checker_username').val(username);
          $('#checker_privilege').val(parts[0]);
        });
      return false;
    }