function() {
      var userId = profile.get('userId');     
      
      if(userId) {
        //Ask for user search history
        $.ajax({
          type: "GET",
          url: "profile/history",
          success: function(data) {
            
            console.log(data);
            try {
              data = JSON.parse(data);
              
              //Create history table
              var historyTable = '<table><tr><th>Query</th><th>Tags</th>Items<th></th></tr>';
              
              historyTable += '</table>';
              
            } catch(e) {
              console.error(e);
            }  
          },
          dataType: "text",
          contentType : "application/json; charset=utf-8"
        });
      }     
    }