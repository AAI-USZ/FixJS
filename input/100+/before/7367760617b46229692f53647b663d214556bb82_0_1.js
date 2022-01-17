function(interfaceName, context){
                    context = context || this;

                    if(context[interfaceName]){
                        // TODO:
                        // if the same key registered, make it a linked list
                        var node = {interface : {interfaceFunc : context[interfaceName], context : context}, next : null};
                        _ifl[interfaceName] ? _ifl[interfaceName].next = node : _ifl[interfaceName] = node;

                    }else{
                        throw 'the registered method does not exist!';
                        //console.log(interfaceName);
                    }
                }