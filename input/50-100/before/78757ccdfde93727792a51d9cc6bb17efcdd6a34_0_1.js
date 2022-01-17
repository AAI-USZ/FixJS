function(json) {
               json = $.postParseJson(json);
               
               $(msg).after(json.Data);
               $(msg).hide();
            }