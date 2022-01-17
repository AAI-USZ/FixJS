function (registerFields) {
        var fieldSet, fieldsLength, i, field, jsonField, fieldObj, 
        id, type, value, errMessage, errId, text, textmsg, regex, character; 

        if(registerFields[0] === "logEmail"){
            fieldSet = this.getLoginFieldset();
        } else {
            fieldSet = this.getregFieldset();
        } 
        
        fieldsLength = fieldSet.length;

        for (i = 0; i < registerFields.length; i++)  {  
            field = registerFields[i];
            jsonField = "$." + field;
            fieldObj = jsonPath(fieldSet, jsonField);
            if ("TRUE" === fieldObj[0].mandatory) {
                id = fieldObj[0].fieldId;
                type = fieldObj[0].type;
                value = $(id).val();
                errMessage = id+"_err";
                errId = id+"_err_div";
                if (value === "") {
                    text = id.split("#");
                    textmsg = text[1].split("g");
                    $(errMessage).html("Please enter " + textmsg[1]);
                    $(errId).addClass("error");
                    $(id).focus();
                    return false;
                }
                
                else{
                    if(value !== "" && type === "EMAIL") {
                        regex = "/^([\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4})?$/";
                        if (!regex.test(value)) {
                            $(errMessage).html("please enter valid email id ");
                            $(errId).addClass("error");
                            $(id).focus();
                          return false;
                        } 
                    }
                    else if(value !== "" && type === "TEXT"){
                        character =  /^[a-zA-Z\s]+$/;
                        if (!character.test(value)) {
                            $(errMessage).html("please enter character only");
                            $(errId).addClass("error");
                            $(id).focus();
                            return false;
                        }
                    }
                    else if(value !== "" && type === "NUMBER"){
                        character =  /^[0-9\s]+$/;
                        if (!character.test(value)) {
                            $(errMessage).html("please enter number only");
                            $(errId).addClass("error");
                            $(id).focus();
                            return false;
                        }
                    }                    
                    
                }
                $(errMessage).html('');
                $(errId).removeClass("error");
            }
        }
        return true;
    }