function(data) {
            $("#ban"+id).html(data);
            $("#ban"+id).attr({ "ONCLICK": "ap_ext_banUser('"+id+"'); return false;" });
        }