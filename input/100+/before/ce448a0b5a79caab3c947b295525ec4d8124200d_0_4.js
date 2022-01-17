function(data){
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
            }