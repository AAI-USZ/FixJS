function adminPanel_extension_unbanUser(id) {
    $("#ban"+id).blur();
    $("#ban"+id).html("<img border='0' width='16' height='16' src='../skins/"+skin+"/grfx/loading13.gif'/>");
    $.post(adminPanel_extension_path + "processor.php", { axAction: "unbanUser", axValue: 0, id: id }, 
        function(data) {
            $("#ban"+id).html(data);
            $("#ban"+id).attr({ "ONCLICK": "adminPanel_extension_banUser('"+id+"'); return false;" });
        }
    );
}