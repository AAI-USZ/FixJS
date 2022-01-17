function ap_ext_banUser(id) {
    $("#ban"+id).blur();
    $("#ban"+id).html("<img border='0' width='16' height='16' src='../skins/"+skin+"/grfx/loading13.gif'/>");
    $.post(ap_ext_path + "processor.php", { axAction: "banUsr", axValue: 0, id: id },
        function(data) {
            $("#ban"+id).html(data);
            $("#ban"+id).attr({ "ONCLICK": "ap_ext_unbanUser('"+id+"'); return false;" });
        }
    );
}