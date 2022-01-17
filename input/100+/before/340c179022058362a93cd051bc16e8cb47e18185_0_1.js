function() {
      // clear out any existing messages
      $('#directory_group_result').html('');
      var reservedGroups = ["public", "registered"];
      var cn = $('#new_group_name_skel').val();
      var perm = $('#new_group_permission_skel').val();
      if ($.inArray($.trim(cn), reservedGroups) != -1) { 
        $('#directory_group_result').html('Group ('+cn+ ') is a reserved group name.'); 
        $('#new_group_name_skel').select();
        return;
      }
      if ($.trim(cn).length == 0) {
        return;
      }
      $.ajax( {
        url: "/directory/group/" + cn, 
        success: function( data ) {           
          if (!data) {
            $('#directory_group_result').html('Group ('+cn+ ') does not exist.'); 
            $('#new_group_name_skel').select();

          }
        },
      }); 

  }