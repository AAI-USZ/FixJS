function(year, month) { 
          
          // Afficher les dates reservés qui sont déjà connues
          for (var idx = 0; idx < alldata.resas.length; idx++) {
            markAsBooked(alldata.resas[idx].date1,alldata.resas[idx].date2);
          }
          // call to json data
          var src = "app_dev.php/list/"+year+"-"+month;
          jQuery.ajax({
            url: src,
            success: function(data) {
//              alert (src);
              data = eval(data);                
              for (var idx = 0; idx < data.length; idx++) {
                markAsBooked(data[idx][0],data[idx][1]);

//                alldata.ids = alldata.ids + ',' + data.resas[idx].id;
                alldata.resas[alldata.resas.length] = data[idx];
              }
            }
          });

    }