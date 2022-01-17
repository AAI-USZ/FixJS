function(message, cb, options){
        var msg = new SimpleModal(Object.merge({
            onAppend:function(){
                $('prompt-dialog-input').focus();
                $('prompt-dialog-input').addEvent('keypress', function(e){
                    if(e.key == 'enter'){
                        $$('#simple-modal a.btn.primary')[0].click();
                    }
                });
            }
        }, options));
        msg.show({
            "model":"confirm",
            "callback": function(){
                var val = $('prompt-dialog-input').get('value');
                if(typeOf(cb) == "function" && val.length > 0)
                    cb(val);
            },
            title:'Dotaz:',
            contents: message + '\n<input type="text" id="prompt-dialog-input" style="width:100%;display:block;" />'
        });
        return this;
    }