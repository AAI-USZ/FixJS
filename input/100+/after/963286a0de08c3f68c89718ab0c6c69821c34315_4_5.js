function export_toggle_cleared(id) {
  path = "#xp"+id+">td.cleared>a";
  if ($(path).hasClass("is_cleared")) {
    returnfunction = new Function("data","if (data!=1) return;\
                    $('"+path+"').removeClass('is_cleared');\
                    $('"+path+"').addClass('isnt_cleared');");
    $.post(export_extension_path + "processor.php", { axAction: "set_cleared", axValue: 0, id: id },
                returnfunction
            );
    
  }
  else {
    returnfunction = new Function("data","if (data!=1) return;\
                    $('"+path+"').removeClass('isnt_cleared');\
                    $('"+path+"').addClass('is_cleared');");
    $.post(export_extension_path + "processor.php", { axAction: "set_cleared", axValue: 1, id: id },
                returnfunction
            );
  }
  $(path).blur();
}