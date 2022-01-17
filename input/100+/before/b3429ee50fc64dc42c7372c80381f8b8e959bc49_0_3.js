function WebNode (uri){
  node = this;
  this.invoke_request = function(){
    id = guid();
    rpc_method = arguments[0];
    args = [];
    for(a = 1; a < arguments.length; a++){
        args.push(arguments[a]);
    }
    request = {jsonrpc:  '2.0',
               method: rpc_method,
               params: args,
               id: id};

    $.ajax({type: 'POST',
            url: uri,
            data: $.toJSON(request),
            dataType: 'text', // using text so we can parse json ourselves
            success: function(data){
              data = new JRMessage(data);
              if(node.message_received)
                node.message_received(data);
              success = !data['error'];
              if(success && node.onsuccess){
                result = data['result'];
                node.onsuccess(result);
              }
              else if(!success && node.onfailed)
                node.onfailed(data['error']['code'], data['error']['message']);
            },
            error: function(jqXHR, textStatus, errorThrown){
              if(node.onfailed)
                node.onfailed(jqXHR.status, textStatus);
            }});
  };
}