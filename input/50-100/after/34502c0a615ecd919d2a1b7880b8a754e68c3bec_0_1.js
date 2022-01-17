function(){
        var params = { 'button': bt_edit_ssh_keypair, 'element_id': 1 };
        $(this).find('#ssh_keypair_display_name').bind('paste', params, DcmgrGUI.Util.availableTextField);
        $(this).find('#ssh_keypair_display_name').bind('keyup', params, DcmgrGUI.Util.availableTextField);
      }