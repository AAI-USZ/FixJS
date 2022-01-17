function(html){
            if (typeof(html) != "string")
                html = html.responseText;
            if (html != ""){
                var arr = html.split("|", 2);
                $("#" + arr[0]).remove();
                $(body).append(arr[1]);
            }
        }