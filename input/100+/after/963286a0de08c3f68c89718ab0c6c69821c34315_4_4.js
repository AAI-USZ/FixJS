function export_toggle_column(name) {
  if ($("#export_head > table > tbody > tr ."+name).hasClass('disabled')) {
    returnfunction = new Function("data","if (data!=1) return;\
                    $('#export_head > table > tbody > tr ."+name+"').removeClass('disabled');\
                    $('div#xp > div > table > tbody > tr > td."+name+"').removeClass('disabled'); ");
    $.post(export_extension_path + "processor.php", { axAction: "toggle_header", axValue: name },
                returnfunction
            );
    
  }
  else {
    returnfunction = new Function("data","if (data!=1) return;\
                    $('#export_head > table > tbody > tr ."+name+"').addClass('disabled'); \
                    $('div#xp > div > table > tbody > tr > td."+name+"').addClass('disabled'); ");
    $.post(export_extension_path + "processor.php", { axAction: "toggle_header", axValue: name },
                returnfunction
            );
  }
}