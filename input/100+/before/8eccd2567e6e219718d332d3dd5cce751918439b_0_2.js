function() {
    var display_name = $(this).find('#display_name').val();
    var load_balancer_size = $(this).find('#load_balancer_size').val();
    var unit = $(this).find('#unit').find('option:selected').val();
    if(!load_balancer_size){
     $('#load_balancer_size').focus();
     return false;
    }
    var data = "size="+load_balancer_size+"&unit="+unit+"&display_name="+display_name;

    var request = new DcmgrGUI.Request;
    request.post({
      "url": '/load_balancers',
      "data": data,
      success: function(json,status){
        console.log(json);
        bt_refresh.element.trigger('dcmgrGUI.refresh');
      }
    });
    $(this).dialog("close");
  }