function expense_quickdelete(id) {
    $('#expensesEntry'+id+'>td>a').blur();
    
    if (confirmText != undefined) {
      var check = confirm(confirmText);
      if (check == false) return;
    }
    
    $('#expensesEntry'+id+'>td>a').removeAttr('onClick');
    $('#expensesEntry'+id+'>td>a.quickdelete>img').attr("src","../skins/standard/grfx/loading13.gif");
    
    $.post(expense_extension_path + "processor.php", { axAction: "quickdelete", axValue: 0, id: id },
        function(data){
            if (data == 1) {
                expense_extension_reload();
            } else {
                alert("~~an error occured!~~")
            }
        }
    );
}