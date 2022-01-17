function verify_time_do(id) {
    var obj = document.getElementById(id);
    debug(obj.value);

    new Ajax.Request(url_prefix + 'thruk/cgi-bin/status.cgi?verify=time&time='+obj.value, {
        onSuccess: function(transport) {
            if(transport.responseJSON != null) {
                data = transport.responseJSON;
            } else {
                data = eval(transport.responseText);
            }
            if(data.verified == "false") {
                debug(data.error)
                verification_errors[id] = 1;
                obj.style.background = "#f8c4c4";
            } else {
                obj.style.background = "";
                delete verification_errors[id];
            }
        }
    });
}