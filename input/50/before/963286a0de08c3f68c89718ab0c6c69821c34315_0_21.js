function(data) {
            $("#ban"+id).html(data);
            $("#ban"+id).attr({ "ONCLICK": "ap_ext_unbanUser('"+id+"'); return false;" });
        }