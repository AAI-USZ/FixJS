function(year, month) { 
          
      // Afficher les dates reservés qui sont déjà connues
      for (var idx = 0; idx < alldata.resas.length; idx++) {
        markAsBooked(alldata.resas[idx][0],alldata.resas[idx][1]);
      }
          
      if (jQuery.inArray(year*100+month,alldata.ids) == -1) {
        // call to json data
        var src = "app_dev.php/list/"+year+"-"+month;
        jQuery.ajax({
          url: src,
          success: function(data) {
            //              alert (src);
            data = eval(data);                
            alldata.ids[alldata.ids.length] = year*100+month;
            for (var idx = 0; idx < data.length; idx++) {
              markAsBooked(data[idx][0],data[idx][1]);

              alldata.resas[alldata.resas.length] = data[idx];
            }
          }
        });
      }

    }