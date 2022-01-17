function(){
          $('.control #operator').slideDown(50);
          var username = $(this).closest('.items').siblings('.username').text();
          var parts = $(this).text().split(':');
          set_priv_operator('full', 'full', {username:username, privilege:parts[0], status:parts[1]});
          $('#checker_username').val(username);
          $('#checker_privilege').val(parts[0]);
        }