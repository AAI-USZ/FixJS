function() {
      var uuid = $(this).find('#ssh_keypair_id').val();
      var display_name = $(this).find('#ssh_keypair_display_name').val();
      var description = $(this).find('#ssh_keypair_description').val();
      var data = 'display_name=' + display_name
               + '&description=' + description
      var request = new DcmgrGUI.Request
      request.put({
	"url": '/keypairs/edit_ssh_keypair/'+uuid+'.json',
	"data": data,
	success: function(json,status){
	  bt_refresh.element.trigger('dcmgrGUI.refresh');
	}
      });

      $(this).dialog("close");
    }