function() { 
    var download_once = $(this).find('#ssh_keypair_download_once').attr('checked');
    var display_name = $(this).find('#ssh_keypair_display_name').val();
    var description = $(this).find('#ssh_keypair_description').val();
    var iframe = $(this).find('iframe:first').contents();
    var html = '<form id="prk_download" action="/keypairs/create_ssh_keypair" method="get">'
              +'<input type="hidden" name="download_once" value="'+download_once+ '">'
              +'<input type="hidden" name="display_name" value="'+display_name+ '">'
              +'<input type="hidden" name="description" value="'+description+ '">'
              +'</form>'

    iframe.find('body').append(html);
    iframe.find("#prk_download").submit();

    var request = new DcmgrGUI.Request
    request.get({
      "url": '/keypairs/all.json',
      "data": "",
      success: function(json,status){
	bt_refresh.element.trigger('dcmgrGUI.refresh');
      }
    });

    $(this).dialog("close");
  }