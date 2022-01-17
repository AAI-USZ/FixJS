function quickdelete(id) {
    $('#zefEntry'+id+'>td>a').blur();
    
    if (confirmText != undefined) {
      var check = confirm(confirmText);
      if (check == false) return;
    }
    
    $('#zefEntry'+id+'>td>a').removeAttr('onClick');
    $('#zefEntry'+id+'>td>a.quickdelete>img').attr("src","../skins/"+skin+"/grfx/loading13.gif");
    
    $.post(ts_ext_path + "processor.php", { axAction: "quickdelete", axValue: 0, id: id },
        function(data){
            if (data == 1) {
                ts_ext_reload();
            } else {
                alert("~~an error occured!~~")
            }
        }
    );
}