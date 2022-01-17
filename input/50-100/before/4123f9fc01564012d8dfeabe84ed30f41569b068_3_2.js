function(){
        html = "<tr>"+
        
        "<td><input type='text' name='attribute_value_name_"+id+"' id='attribute_value_name_"+id+"' size='8' style='50%;'></td></tr>";
              $('.dd').fadeIn('slow');
    $('#ddtable tr:last').after(html);
    id++;
        }