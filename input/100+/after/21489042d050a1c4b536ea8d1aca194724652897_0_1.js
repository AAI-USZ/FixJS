function _inputErrorCheck(){
                var errorExist = false;
                
                var titleText = that.find(".title_text");
                if($.trim(titleText.val()) === ""){
                    _addInputErrorClass(titleText);
                    errorExist = true;
                }
                var charLimit = my.prop.charLimit;

                (function(){

                    $(["title_text", "text","note_text"]).each(function(i, v){
                        var o = that.find("." + v);
                        if(!_checkTextLength($.trim(o.val()), charLimit[v])){
                            _addInputErrorClass(o);
                            errorExist = true;
                        }
                    });
                })();
                
                that.find(".param_name_text").each(function(i, v){
                        if(!_checkTextLength($.trim($(v).val()), charLimit.param_name)){
                            _addInputErrorClass($(v));
                            errorExist = true;
                        }
                });
                return !errorExist;
                
                function _checkTextLength(txt, len){
                    return txt.length <= len;
                }
        	}