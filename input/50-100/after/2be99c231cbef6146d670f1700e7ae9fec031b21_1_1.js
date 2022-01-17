function(a){$(".vz_url_field").each(vzUrl.check_field).live("keyup",vzUrl.check_field).live("paste",function(b){setTimeout(function(){vzUrl.check_field.call(b.target);
},0);});}