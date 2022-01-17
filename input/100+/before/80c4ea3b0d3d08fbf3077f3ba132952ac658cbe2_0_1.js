function( request, response ) { 
      $.ajax( {
        url: "http://ws.geonames.org/searchJSON",
        dataType: "jsonp",
        data: {
          featureClass: "P",
          style: "full",
          maxRows: 12, 
          name_startsWith: request.term
        },  
        success: function( data ) {           response( $.map( data.geonames, function( item ) { 
            return {
              label: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryName,
              value: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryName,
            }   
          }));
        }   
      }); 
    }