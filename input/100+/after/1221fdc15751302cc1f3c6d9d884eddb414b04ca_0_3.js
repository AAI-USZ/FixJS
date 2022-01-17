function(str, t, id, table) {
    var options = [];
    var alpha = /^([a-zA-Z ]+)/;

    if (alpha.test(str)==true) {
        if (window.XMLHttpRequest) {
            xmlhttp=new XMLHttpRequest();
        } else {
            return;
        }

        xmlhttp.onreadystatechange=function()
        {

            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                options = JSON.parse(xmlhttp.responseText);
                $( "#" +id ).autocomplete({ 
                    minLength: 0,
                    delay: 20,
                    select: function(event, ui) { 
                        unit = t.fields[id].current_unit;
                        denominator = t.fields[id].units[unit];
                        ui.item.value = ui.item.value / denominator;
                    },
		            source: options
	            });
            }
        };

        xmlhttp.open("GET","spacetravel.php?field=" + table +"&value="+str,true);
        xmlhttp.send();            
    };
}