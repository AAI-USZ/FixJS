function() {
    var display_name = $(this).find('#display_name').val();
    var load_balancer_protocol = $(this).find('#load_balancer_protocol').val();
    var load_balancer_port = $(this).find('#load_balancer_port').val();
    var instance_protocol = $(this).find('#instance_protocol').val();
    var instance_port = $(this).find('#instance_port').val();
    var certificate_name = $(this).find('#certificate_name').val();
    var public_key = $(this).find('#public_key').val();
    var private_key = $(this).find('#private_key').val();
    var certificate_chain = $(this).find('#certificate_chain').val();
    var cookie_name = $(this).find('#cookie_name').val();

    var data = "display_name="+display_name
               +"&load_balancer_protocol="+load_balancer_protocol
               +"&load_balancer_port="+load_balancer_port
               +"&instance_protocol="+instance_protocol
               +"&instance_port="+instance_port
               +"&certificate_name="+certificate_name
               +"&private_key="+private_key
               +"&public_key="+public_key
               +"&certificate_chain="+certificate_chain
               +"&cookie_name="+cookie_name;

    var request = new DcmgrGUI.Request;
    request.post({
      "url": '/load_balancers',
      "data": data,
      success: function(json,status){
        bt_refresh.element.trigger('dcmgrGUI.refresh');
      }
    });

    $(this).dialog("close");
  }