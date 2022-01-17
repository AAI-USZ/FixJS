function exp_quickdelete(id) {
    $('#expEntry'+id+'>td>a').blur();
    
    if (confirmText != undefined) {
      var check = confirm(confirmText);
      if (check == false) return;
    }
    
    $('#expEntry'+id+'>td>a').removeAttr('onClick');
    $('#expEntry'+id+'>td>a.quickdelete>img').attr("src","../skins/standard/grfx/loading13.gif");
    
    $.post(exp_ext_path + "processor.php", { axAction: "quickdelete", axValue: 0, id: id },
        function(data){
            if (data == 1) {
                exp_ext_reload();
            } else {
                alert("~~an error occured!~~")
            }
        }
    );
}