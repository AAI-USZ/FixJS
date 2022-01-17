function(data) {
            $("#ban"+id).html(data);
            $("#ban"+id).attr({ "ONCLICK": "adminPanel_extension_banUser('"+id+"'); return false;" });
        }