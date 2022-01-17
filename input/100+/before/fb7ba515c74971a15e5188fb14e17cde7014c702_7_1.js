function (validateFormFields) {
        var fieldSet = this.getFieldset(),
        fieldsLength = fieldSet.length,
        i, field, jsonField, fieldObj, id, type, value, errMessage, errId, text,
        regex, character;

        for (i = 0; i < validateFormFields.length; i++)  {  
            field = validateFormFields[i];
            jsonField = "$." + field;
            fieldObj = jsonPath(fieldSet, jsonField);
            
            if (fieldObj[0] !== undefined && "TRUE" === fieldObj[0].mandatory) {
                id = fieldObj[0].fieldId;
                type = fieldObj[0].type;                        
                value = $(id).val();
                errMessage = id+"_err";
                errId = id+"_err_div";
                
                if (value === "") {
                    text = id.split("#");
                    $(errMessage).html("please enter "+ text[1]);
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
                        $(errMessage).html('');
                        $(errId).removeClass("error");
                    }
                    else if(value !== "" && type === "TEXT"){ 
                        character =  /^[a-zA-Z\s]+$/;
                        if (!character.test(value)) {
                            $(errMessage).html("please enter character only");
                            $(errId).addClass("error");
                            $(id).focus();
                            return false;
                        }
                        $(errMessage).html('');
                        $(errId).removeClass("error");
                    }
                     else if(value !== "" && type === "STRING"){ 
                        character =  "/^[a-zA-Z0-9\\s^,^.,^#,^(,^)]+$/";
                        if (!character.test(value)) {
                            $(errMessage).html("please enter character and number only");
                            $(errId).addClass("error");
                            $(id).focus();
                            return false;
                        }
                        $(errMessage).html('');
                        $(errId).removeClass("error");
                    }
                    else if(value !== "" && type === "NUMBER"){
                        character =  "/^[0-9\\s^+^-]+$/"; 
                        if (!character.test(value)) {
                            $(errMessage).html("please enter correct format");
                            $(errId).addClass("error");
                            $(id).focus();
                            return false;
                        }
                        $(errMessage).html('');
                        $(errId).removeClass("error");
                    }                    
                }
            }
        }
        return true;
    }