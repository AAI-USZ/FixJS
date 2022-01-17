function(value, element){
                    return value.indexOf(sakai.api.i18n.getValueForKey("ENTER_CONTACT_OR_GROUP_NAMES", "sendmessage")) === -1 && $.trim($(element).next("input.as-values").val()).replace(/,/g, "") !== "";
                }