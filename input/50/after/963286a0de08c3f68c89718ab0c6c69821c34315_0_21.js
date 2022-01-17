function(data) {
            $("#ban"+id).html(data);
            $("#ban"+id).attr({ "ONCLICK": "adminPanel_extension_unbanUser('"+id+"'); return false;" });
        }