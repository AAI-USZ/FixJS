f
            //if(!this.__initializing__){
            if(!this.constructor.__initializing__){
                this.__cid__ = this.__className__ + '_instance_' + parseInt((new Date()).getTime()+Math.random()*1e13).toString(16);

                var _ifl = {};

                this.registerInterface = function(interfaceName, context){
                    context = context || this;

                    if(context[interfaceName]){
                        // TODO:
                        // if the same key registered, make it a linked list
                        var node = {interface : {interfaceFunc : context[interfaceName], context : context}, next : null};
                        //_ifl[interfaceName] ? _ifl[interfaceName].next = node : _ifl[interfaceName] = node;
                        if(!_ifl[interfaceName]){ _ifl[interfaceName] = node;}
                        else{
                            var t = _ifl[interfaceName];
                            while (t.next) { t = t.next }
                            t.next = node;
                        }

                    }else{
                        throw 'the registered method does not exist!';
                        //console.log(interfaceName);
                    }
                };

                this.applyInterface = function(interfaceName){
                    interfaceName = interfaceName || '';
                    var _ret,
                        args = slice.call(arguments, 1),
                        itfa = interfaceName.split('.'),
                        l = itfa.length,
                        baseClass = l > 1 ? itfa[l-2] : null,
                        //namespace,
                        _itf = _ifl[itfa[l-1]];

                    while(_itf){
                        if(!baseClass || (baseClass && _itf.interface.context.__className__ === baseClass)){
                            _ret = _itf.interface.interfaceFunc.apply(_itf.interface.context || this, args);
                        }
                        _itf = _itf.next;
                        args.push(_ret);
                    }
                    return _ret;
                };

                this.removeInterface = function(interfaceName, context){
                    if(_ifl[interfaceName] && context === undefined) delete _ifl[interfaceName];
                    if(_ifl[interfaceName] && context){
                        var pre =_ifl[interfaceName], node = pre;
                        while(node){
                            if(node.interface.context == context){
                                if(node == pre) {_ifl[interfaceName] = node.next; return;}
                                pre.next = node.next;
                                return;
                            }
                            pre = node;
                            node = node.next;
                        }
                    }
                };

                if(this.init){
                    return this.init.apply(this, arguments);
                    // TODO:
                    // afterInit :
                }

            }else{
                delete this.constructor.__initializing__;
            }
        };
