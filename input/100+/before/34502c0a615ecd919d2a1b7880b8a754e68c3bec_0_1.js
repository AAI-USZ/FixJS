function() {
      var uuid = $(this).find('#ssh_keypair_id').val();
      var display_name = $(this).find('#ssh_keypair_display_name').val();
      var description = $(this).find('#ssh_keypair_description').val();
      var iframe = $(this).find('iframe:first').contents();
      var html = '<form id="prk_download" action="/keypairs/edit_ssh_keypair" method="get">'
                +'<input type="hidden" name="id" value="'+uuid+ '">'
                +'<input type="hidden" name="display_name" value="'+display_name+ '">'
                +'<input type="hidden" name="description" value="'+description+ '">'
                +'</form>'

      iframe.find('body').append(html);
      iframe.find("#prk_download").submit();
      bt_refresh.element.trigger('dcmgrGUI.refresh');
      $(this).dialog("close");
    }