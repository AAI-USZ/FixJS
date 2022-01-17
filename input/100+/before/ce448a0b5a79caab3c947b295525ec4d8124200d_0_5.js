function(){
    id = guid();
    rpc_method = arguments[0];
    args = [];
    for(a = 1; a < arguments.length; a++){
      if(getObjectClass(arguments[a]) == "JRObject")
        args.push(arguments[a].to_json());
      else
        args.push(arguments[a]);
    }
    request = {jsonrpc:  '2.0',
               method: rpc_method,
               params: args,
               id: id};

    $.ajax({type: 'POST',
            url: uri,
            data: $.toJSON(request),
            dataType: 'json',
            success: function(data){
              if(node.message_received)
                node.message_received(data);
              success = !data['error'];
              if(success && node.onsuccess){
                result = data['result'];
                if(JRObject.is_jrobject(result))
                  result = JRObject.from_json(result);
                node.onsuccess(result);
              }
              else if(!success && node.onfailed)
                node.onfailed(data['error']['code'], data['error']['message']);
            },
            error: function(jqXHR, textStatus, errorThrown){
              if(node.onfailed)
                node.onfailed(jqXHR.status, textStatus);
            }});
  }