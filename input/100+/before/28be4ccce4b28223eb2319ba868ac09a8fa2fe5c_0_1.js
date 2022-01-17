function(service_name){
        if (SERVICE_DATA[service_name]){
            var url = SERVICE_DATA[service_name]['url'];
            $.ajax({
                async: false,
                url: "http://json-tinyurl.appspot.com/?&callback=?",
                dataType: "json",
                data: {'url':URL},
                success: function(data){
                    url = url.replace('{URL}', data.tinyurl);
                },
                error: function(data){
                    url = url.replace('{URL}', URL);
                },
                complete: function(data){
                    url = url.replace('{TEXT}', TEXT);
                    var params = SERVICE_DATA[service_name]['params'];
                    if(!window.open(url, "sharing", params)){
                        window.location.href=url;
                    }
                }
            });
        }
    }